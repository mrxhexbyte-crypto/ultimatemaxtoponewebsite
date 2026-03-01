// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Treasury
 * @dev Manages DAO funds from shop revenue, staking rewards, and treasury grants
 */
contract Treasury is Ownable, ReentrancyGuard {
    struct Budget {
        string category; // "Operations", "Development", "Marketing", "Grants"
        uint256 allocated;
        uint256 spent;
        uint256 periodEnd;
    }

    struct Withdrawal {
        address recipient;
        uint256 amount;
        string reason;
        uint256 timestamp;
        bool executed;
    }

    mapping(string => Budget) public budgets;
    mapping(uint256 => Withdrawal) public withdrawals;

    uint256 public totalRevenue;
    uint256 public totalSpent;
    uint256 public withdrawalCounter;
    address public immutable governor;

    event RevenueReceived(address indexed from, uint256 amount, string source);
    event WithdrawalProposed(uint256 indexed id, address indexed recipient, uint256 amount);
    event WithdrawalExecuted(uint256 indexed id, address indexed recipient, uint256 amount);
    event BudgetAllocated(string indexed category, uint256 amount);
    event TokensWithdrawn(address indexed token, address indexed recipient, uint256 amount);

    constructor(address _governor) {
        governor = _governor;
        transferOwnership(_governor);
    }

    /**
     * @dev Receive ETH revenue
     */
    receive() external payable {
        totalRevenue += msg.value;
        emit RevenueReceived(msg.sender, msg.value, "ETH");
    }

    /**
     * @dev Receive ERC20 tokens as revenue
     */
    function receiveTokens(address _token, uint256 _amount, string memory _source) external {
        require(IERC20(_token).transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        totalRevenue += _amount;
        emit RevenueReceived(msg.sender, _amount, _source);
    }

    /**
     * @dev Allocate budget for a category
     */
    function allocateBudget(
        string memory _category,
        uint256 _amount,
        uint256 _periodLength
    ) external onlyOwner {
        budgets[_category] = Budget(_category, _amount, 0, block.timestamp + _periodLength);
        emit BudgetAllocated(_category, _amount);
    }

    /**
     * @dev Propose withdrawal
     */
    function proposeWithdrawal(
        address _recipient,
        uint256 _amount,
        string memory _reason
    ) external onlyOwner returns (uint256) {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be > 0");
        require(_amount <= address(this).balance, "Insufficient balance");

        withdrawalCounter++;
        withdrawals[withdrawalCounter] = Withdrawal(
            _recipient,
            _amount,
            _reason,
            block.timestamp,
            false
        );

        emit WithdrawalProposed(withdrawalCounter, _recipient, _amount);
        return withdrawalCounter;
    }

    /**
     * @dev Execute withdrawal
     */
    function executeWithdrawal(uint256 _id) external onlyOwner nonReentrant {
        Withdrawal storage withdrawal = withdrawals[_id];
        require(!withdrawal.executed, "Already executed");
        require(address(this).balance >= withdrawal.amount, "Insufficient balance");

        withdrawal.executed = true;
        (bool success, ) = payable(withdrawal.recipient).call{value: withdrawal.amount}("");
        require(success, "Withdrawal failed");

        totalSpent += withdrawal.amount;
        emit WithdrawalExecuted(_id, withdrawal.recipient, withdrawal.amount);
    }

    /**
     * @dev Release ETH funds
     */
    function releaseFunds(address payable _to, uint256 _amount) external onlyOwner nonReentrant {
        require(_to != address(0), "Invalid address");
        require(_amount <= address(this).balance, "Insufficient funds");
        
        totalSpent += _amount;
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Transfer failed");
        
        emit WithdrawalExecuted(0, _to, _amount);
    }

    /**
     * @dev Release ERC20 tokens
     */
    function releaseERC20(address _token, address _to, uint256 _amount) external onlyOwner nonReentrant {
        require(_to != address(0), "Invalid address");
        IERC20 token = IERC20(_token);
        require(_amount <= token.balanceOf(address(this)), "Insufficient funds");
        
        totalSpent += _amount;
        require(token.transfer(_to, _amount), "Transfer failed");
        
        emit TokensWithdrawn(_token, _to, _amount);
    }

    /**
     * @dev Get budget status
     */
    function getBudget(string memory _category) external view returns (Budget memory) {
        return budgets[_category];
    }

    /**
     * @dev Get withdrawal details
     */
    function getWithdrawal(uint256 _id) external view returns (Withdrawal memory) {
        return withdrawals[_id];
    }

    /**
     * @dev Get treasury balance
     */
    function getTreasuryBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
