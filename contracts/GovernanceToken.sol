// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GovernanceToken (ZYX)
 * @dev ERC20Votes token for ZAYX-OS DAO governance
 * Holders can propose and vote on platform decisions
 */
contract GovernanceToken is ERC20, ERC20Votes, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10 ** 18; // 1B tokens
    uint256 public constant INITIAL_SUPPLY = 100000000 * 10 ** 18; // 100M initial

    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor() ERC20("ZAYX Governance Token", "ZYX") ERC20Permit("ZAYX Governance Token") {
        _mint(msg.sender, INITIAL_SUPPLY);
        emit TokensMinted(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Mint new governance tokens
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Burn tokens
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Burn tokens from another address
     */
    function burnFrom(address account, uint256 amount) external {
        uint256 currentAllowance = allowance(account, msg.sender);
        require(currentAllowance >= amount, "ERC20: insufficient allowance");
        unchecked {
            _approve(account, msg.sender, currentAllowance - amount);
        }
        _burn(account, amount);
        emit TokensBurned(account, amount);
    }

    // Override hooks for ERC20Votes compatibility
    function _update(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._update(from, to, amount);
    }

    function nonces(address owner) public view override(ERC20Permit, ERC20Votes) returns (uint256) {
        return super.nonces(owner);
    }
}
