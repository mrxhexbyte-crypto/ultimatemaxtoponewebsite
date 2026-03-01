import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();

  const ShopPayment = await ethers.getContractFactory("ShopPayment");
  const shopPayment = await ShopPayment.deploy(treasury.address);

  const OrderReceipt = await ethers.getContractFactory("OrderReceipt");
  const orderReceipt = await OrderReceipt.deploy();

  const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
  const governanceToken = await GovernanceToken.deploy();

  const Timelock = await ethers.getContractFactory("TimelockController");
  const timelock = await Timelock.deploy(3600, [], [], deployer.address);

  const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
  const daoGovernor = await DAOGovernor.deploy(governanceToken.address, timelock.address);

  const ProductRegistry = await ethers.getContractFactory("ProductRegistry");
  const productRegistry = await ProductRegistry.deploy();

  console.log("Treasury deployed to:", treasury.address);
  console.log("ShopPayment deployed to:", shopPayment.address);
  console.log("OrderReceipt deployed to:", orderReceipt.address);
  console.log("GovernanceToken deployed to:", governanceToken.address);
  console.log("Timelock deployed to:", timelock.address);
  console.log("DAOGovernor deployed to:", daoGovernor.address);
  console.log("ProductRegistry deployed to:", productRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
