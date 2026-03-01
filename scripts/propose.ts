import { ethers } from "hardhat";
import { DAOGovernor } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const governor = await ethers.getContract<DAOGovernor>("DAOGovernor");

  const tx = await governor.propose(
    ["0x..."], // Target contract addresses
    [0], // ETH values
    ["0x..."], // Calldata
    "Test Proposal"
  );

  const receipt = await tx.wait();
  const event = receipt.events?.find((e) => e.event === "ProposalCreated");
  const proposalId = event?.args?.proposalId;

  console.log("Proposal created with ID:", proposalId.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
