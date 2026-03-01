// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title OrderReceipt
 * @dev ERC721 NFT issued as proof of purchase for orders
 * Stores order metadata on-chain and off-chain (IPFS)
 */
contract OrderReceipt is ERC721, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    Counters.Counter private tokenIdCounter;

    struct ReceiptData {
        uint256 tokenId;
        address buyer;
        string orderId;
        string productId;
        uint256 amount;
        string currency; // "ETH", "USDC", etc.
        uint256 purchaseDate;
        string metadataURI; // IPFS hash
        bool isPhysical;
        bool isDigital;
    }

    mapping(uint256 => ReceiptData) public receipts;
    mapping(string => uint256) public orderIdToTokenId;

    event ReceiptMinted(
        uint256 indexed tokenId,
        address indexed buyer,
        string orderId,
        uint256 amount,
        string currency
    );
    event ReceiptBurned(uint256 indexed tokenId);
    event MetadataUpdated(uint256 indexed tokenId, string newURI);

    constructor() ERC721("ZAYX Order Receipt", "ZAYX-RCPT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
     * @dev Mint an order receipt NFT
     */
    function mintReceipt(
        address _to,
        string memory _orderId,
        string memory _productId,
        uint256 _amount,
        string memory _currency,
        string memory _metadataURI,
        bool _isPhysical,
        bool _isDigital
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        tokenIdCounter.increment();
        uint256 tokenId = tokenIdCounter.current();

        receipts[tokenId] = ReceiptData(
            tokenId,
            _to,
            _orderId,
            _productId,
            _amount,
            _currency,
            block.timestamp,
            _metadataURI,
            _isPhysical,
            _isDigital
        );

        orderIdToTokenId[_orderId] = tokenId;

        _safeMint(_to, tokenId);

        emit ReceiptMinted(tokenId, _to, _orderId, _amount, _currency);
        return tokenId;
    }

    /**
     * @dev Update metadata URI (for digital delivery)
     */
    function updateMetadata(uint256 _tokenId, string memory _newURI) external onlyRole(MINTER_ROLE) {
        require(_tokenId > 0 && _tokenId <= tokenIdCounter.current(), "Invalid token ID");
        receipts[_tokenId].metadataURI = _newURI;
        emit MetadataUpdated(_tokenId, _newURI);
    }

    /**
     * @dev Burn receipt (for refunds/cancellations)
     */
    function burnReceipt(uint256 _tokenId) external onlyRole(MINTER_ROLE) {
        require(_exists(_tokenId), "Token does not exist");
        _burn(_tokenId);
        emit ReceiptBurned(_tokenId);
    }

    /**
     * @dev Get receipt data
     */
    function getReceipt(uint256 _tokenId) external view returns (ReceiptData memory) {
        require(_exists(_tokenId), "Token does not exist");
        return receipts[_tokenId];
    }

    /**
     * @dev Get token ID from order ID
     */
    function getTokenIdByOrderId(string memory _orderId) external view returns (uint256) {
        return orderIdToTokenId[_orderId];
    }

    /**
     * @dev Override tokenURI
     */
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "Token does not exist");
        return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/", receipts[_tokenId].metadataURI));
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        return _tokenId > 0 && _tokenId <= tokenIdCounter.current();
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
