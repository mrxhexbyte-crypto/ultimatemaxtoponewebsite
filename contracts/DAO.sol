// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    address public owner;
    mapping(address => bool) public members;
    uint public nextProposalId;

    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        mapping(address => bool) voters;
    }

    mapping(uint => Proposal) public proposals;

    modifier onlyMember() {
        require(members[msg.sender], "Only members can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
        members[msg.sender] = true;
    }

    function addMember(address _newMember) public {
        require(msg.sender == owner, "Only the owner can add members.");
        members[_newMember] = true;
    }

    function createProposal(string memory _description) public onlyMember {
        proposals[nextProposalId].id = nextProposalId;
        proposals[nextProposalId].description = _description;
        nextProposalId++;
    }

    function vote(uint _proposalId) public onlyMember {
        require(!proposals[_proposalId].voters[msg.sender], "You have already voted on this proposal.");
        proposals[_proposalId].voters[msg.sender] = true;
        proposals[_proposalId].voteCount++;
    }
}
