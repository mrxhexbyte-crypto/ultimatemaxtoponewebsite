import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("GovernanceToken", function () {
  let owner: Signer, user: Signer;
  let tokenContract: Contract;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    tokenContract = await GovernanceToken.deploy();
    await tokenContract.deployed();
  });

  it("Should mint initial supply to owner", async function () {
    const ownerBalance = await tokenContract.balanceOf(await owner.getAddress());
    expect(ownerBalance).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should allow owner to mint more tokens", async function () {
    const amount = ethers.utils.parseEther("1000");
    await tokenContract.connect(owner).mint(await user.getAddress(), amount);
    const userBalance = await tokenContract.balanceOf(await user.getAddress());
    expect(userBalance).to.equal(amount);
  });

  it("Should not allow non-owners to mint tokens", async function () {
    const amount = ethers.utils.parseEther("1000");
    await expect(tokenContract.connect(user).mint(await user.getAddress(), amount)).to.be.reverted;
  });
});
