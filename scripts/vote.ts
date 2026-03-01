import { ethers } from "hardhat";
import { DAOGovernor } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const governor = await ethers.getContract<DAOGovernor>("DAOGovernor");

  const proposalId = "..."; // Get from propose.ts
  const vote = 1; // 0 = Against, 1 = For, 2 = Abstain

  const tx = await governor.castVote(proposalId, vote);
  await tx.wait();

  console.log("Voted on proposal:", proposalId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
