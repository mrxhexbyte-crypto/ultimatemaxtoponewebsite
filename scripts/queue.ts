import { ethers } from "hardhat";
import { DAOGovernor } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const governor = await ethers.getContract<DAOGovernor>("DAOGovernor");

  const proposalId = "..."; // Get from propose.ts

  const tx = await governor.queue(
    ["0x..."], // Target contract addresses
    [0], // ETH values
    ["0x..."], // Calldata
    ethers.utils.id("Test Proposal")
  );

  await tx.wait();

  console.log("Queued proposal:", proposalId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
