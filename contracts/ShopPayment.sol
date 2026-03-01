// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ShopPayment
 * @dev Handles crypto payments for physical and digital products
 * Supports ETH, USDC, and other whitelisted ERC20 tokens
 */
contract ShopPayment is Ownable, Pausable, ReentrancyGuard {
    struct Order {
        uint256 orderId;
        address buyer;
        uint256 amount;
        address tokenAddress;
        string productId;
        bool isPaid;
        uint256 timestamp;
    }

    event OrderCreated(uint256 indexed orderId, address indexed buyer, uint256 amount, string productId);
    event OrderPaid(address indexed buyer, uint256 indexed orderId, uint256 amount, address tokenAddress);
    event RefundProcessed(uint256 indexed orderId, address indexed buyer, uint256 amount);
    event TokenWhitelisted(address indexed token, bool whitelisted);
    event TreasuryUpdated(address indexed newTreasury);
    event FeeUpdated(uint256 newFeePercentage);

    address public treasury;
    uint256 public treasuryFeePercentage = 250; // 2.5%
    
    mapping(uint256 => Order) public orders;
    mapping(address => bool) public isTokenWhitelisted;
    mapping(address => uint256) public pendingWithdrawals;
    
    uint256 public orderCounter;

    constructor(address _treasury) {
        treasury = _treasury;
        // Add common stablecoins to whitelist by default
    }

    /**
     * @dev Create a new order
     */
    function createOrder(string memory _productId, uint256 _amount) external returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        orderCounter++;
        
        orders[orderCounter] = Order(
            orderCounter,
            msg.sender,
            _amount,
            address(0),
            _productId,
            false,
            block.timestamp
        );
        
        emit OrderCreated(orderCounter, msg.sender, _amount, _productId);
        return orderCounter;
    }

    /**
     * @dev Pay for an order with ETH
     */
    function payWithETH(uint256 _orderId) external payable nonReentrant whenNotPaused {
        Order storage order = orders[_orderId];
        require(!order.isPaid, "Order already paid");
        require(order.buyer == msg.sender, "Only order buyer can pay");
        require(msg.value >= order.amount, "Insufficient ETH sent");

        order.isPaid = true;
        order.tokenAddress = address(0);

        uint256 fee = (msg.value * treasuryFeePercentage) / 10000;
        uint256 sellerAmount = msg.value - fee;

        pendingWithdrawals[treasury] += fee;
        pendingWithdrawals[owner()] += sellerAmount;

        // Refund excess ETH
        if (msg.value > order.amount) {
            (bool success, ) = payable(msg.sender).call{value: msg.value - order.amount}("");
            require(success, "Refund failed");
        }

        emit OrderPaid(msg.sender, _orderId, msg.value, address(0));
    }

    /**
     * @dev Pay for an order with ERC20 token
     */
    function payWithToken(uint256 _orderId, address _token, uint256 _amount) external nonReentrant whenNotPaused {
        require(isTokenWhitelisted[_token], "Token not whitelisted");
        
        Order storage order = orders[_orderId];
        require(!order.isPaid, "Order already paid");
        require(order.buyer == msg.sender, "Only order buyer can pay");
        require(_amount >= order.amount, "Insufficient amount");

        order.isPaid = true;
        order.tokenAddress = _token;

        // Transfer tokens to contract
        require(
            IERC20(_token).transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );

        uint256 fee = (_amount * treasuryFeePercentage) / 10000;
        uint256 sellerAmount = _amount - fee;

        // Transfer fee to treasury (simplified for this example)
        require(IERC20(_token).transfer(treasury, fee), "Fee transfer failed");
        require(IERC20(_token).transfer(owner(), sellerAmount), "Seller payment failed");

        emit OrderPaid(msg.sender, _orderId, _amount, _token);
    }

    /**
     * @dev Get order details
     */
    function getOrder(uint256 _orderId) external view returns (Order memory) {
        return orders[_orderId];
    }

    /**
     * @dev Withdraw pending ETH
     */
    function withdrawETH(uint256 _amount) external nonReentrant {
        require(pendingWithdrawals[msg.sender] >= _amount, "Insufficient balance");
        pendingWithdrawals[msg.sender] -= _amount;
        
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Withdraw pending tokens (for treasury)
     */
    function withdrawTokens(address _token, uint256 _amount) external onlyOwner nonReentrant {
        require(IERC20(_token).transfer(msg.sender, _amount), "Transfer failed");
    }

    /**
     * @dev Whitelist a token for payments
     */
    function whitelistToken(address _token) external onlyOwner {
        require(_token != address(0), "Invalid token address");
        isTokenWhitelisted[_token] = true;
        emit TokenWhitelisted(_token, true);
    }

    /**
     * @dev Remove token from whitelist
     */
    function removeToken(address _token) external onlyOwner {
        isTokenWhitelisted[_token] = false;
        emit TokenWhitelisted(_token, false);
    }

    /**
     * @dev Update treasury address
     */
    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury address");
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    /**
     * @dev Update fee percentage (in basis points, e.g., 250 = 2.5%)
     */
    function setFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 10000, "Fee too high");
        treasuryFeePercentage = _feePercentage;
        emit FeeUpdated(_feePercentage);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {}
}
