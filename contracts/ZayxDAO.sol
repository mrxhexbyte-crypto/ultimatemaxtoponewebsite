// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZayxToken is ERC20, ERC20Votes, Ownable {
    constructor() ERC20("ZayxDAO Token", "ZAYX") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(address owner) public view override(ERC20Permit, ERC20Votes) returns (uint256) {
        return super.nonces(owner);
    }
}

contract ZayxDAOTimelock is TimelockController {
    constructor(uint256 minDelay, address[] memory proposers, address[] memory executors) 
        TimelockController(minDelay, proposers, executors, msg.sender)
    {}
}

contract ZayxDAO is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl {
    constructor(IVotes _token, TimelockController _timelock) 
        Governor("ZayxDAO") 
        GovernorVotes(_token) 
        GovernorVotesQuorumFraction(4) 
        GovernorTimelockControl(_timelock)
    {}

    function votingDelay() public pure override returns (uint256) {
        return 1; // 1 block
    }

    function votingPeriod() public pure override returns (uint256) {
        return 50400; // 1 week
    }

    function proposalThreshold() public pure override returns (uint256) {
        return 0;
    }
}
