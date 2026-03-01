import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";


describe("ShopPayment", function () {
  let owner: Signer, buyer: Signer, treasury: Signer;
  let paymentContract: Contract;
  let token: Contract;


  beforeEach(async function () {
    [owner, buyer, treasury] = await ethers.getSigners();


    const ShopPayment = await ethers.getContractFactory("ShopPayment");
    paymentContract = await ShopPayment.deploy(await treasury.getAddress(), 5);
    await paymentContract.deployed();


    const TestToken = await ethers.getContractFactory("TestToken");
    token = await TestToken.deploy();
    await token.deployed();
    
    await token.mint(await buyer.getAddress(), ethers.utils.parseEther("1000"));
    await paymentContract.connect(owner).addTokenToWhitelist(token.address);
  });


  it("Should process ETH payment correctly", async function () {
    const orderId = 1;
    const amount = ethers.utils.parseEther("1");


    await expect(paymentContract.connect(buyer).pay(orderId, "0x0000000000000000000000000000000000000000", amount, { value: amount }))
      .to.emit(paymentContract, "OrderPaid")
      .withArgs(await buyer.getAddress(), orderId, amount);


    const fee = amount.mul(5).div(100);
    const paymentToOwner = amount.sub(fee);


    expect(await ethers.provider.getBalance(await treasury.getAddress())).to.equal(ethers.utils.parseEther("10000").add(fee));
    expect(await ethers.provider.getBalance(await owner.getAddress())).to.equal(ethers.utils.parseEther("10000").add(paymentToOwner));
  });


  it("Should process ERC20 payment correctly", async function () {
    const orderId = 2;
    const amount = ethers.utils.parseEther("100");


    await token.connect(buyer).approve(paymentContract.address, amount);


    await expect(paymentContract.connect(buyer).pay(orderId, token.address, amount))
      .to.emit(paymentContract, "OrderPaid")
      .withArgs(await buyer.getAddress(), orderId, amount);


    const fee = amount.mul(5).div(100);
    const paymentToOwner = amount.sub(fee);


    expect(await token.balanceOf(await treasury.getAddress())).to.equal(fee);
    expect(await token.balanceOf(await owner.getAddress())).to.equal(paymentToOwner);
  });
});
