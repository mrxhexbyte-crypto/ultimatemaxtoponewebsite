import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";


describe("OrderReceipt", function () {
  let owner: Signer, minter: Signer, user: Signer;
  let receiptContract: Contract;


  beforeEach(async function () {
    [owner, minter, user] = await ethers.getSigners();


    const OrderReceipt = await ethers.getContractFactory("OrderReceipt");
    receiptContract = await OrderReceipt.deploy();
    await receiptContract.deployed();


    await receiptContract.grantRole(await receiptContract.MINTER_ROLE(), await minter.getAddress());
  });


  it("Should mint a new receipt NFT", async function () {
    const tokenId = 0;
    const tokenURI = "ipfs://some-hash";


    await expect(receiptContract.connect(minter).safeMint(await user.getAddress(), tokenURI))
      .to.emit(receiptContract, "Transfer")
      .withArgs(ethers.constants.AddressZero, await user.getAddress(), tokenId);


    expect(await receiptContract.ownerOf(tokenId)).to.equal(await user.getAddress());
    expect(await receiptContract.tokenURI(tokenId)).to.equal(`${await receiptContract.baseURI()}${tokenURI}`);
  });


  it("Should only allow minters to mint", async function () {
    const tokenURI = "ipfs://some-hash";
    await expect(receiptContract.connect(user).safeMint(await user.getAddress(), tokenURI)).to.be.reverted;
  });
});
