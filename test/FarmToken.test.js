const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FarmToken", function () {
  let farmToken;
  let owner, investor;
  
  beforeEach(async function () {
    [owner, investor] = await ethers.getSigners();
    
    const FarmToken = await ethers.getContractFactory("FarmToken");
    farmToken = await FarmToken.deploy(
      "Test Farm Token",
      "FARM001",
      1000, // max supply
      ethers.parseEther("0.1"), // 0.1 ETH per token
      "FARM001",
      "Test Farm",
      "Maize",
      "Nigeria",
      ethers.parseEther("100"), // 100 ETH goal
      Math.floor(Date.now() / 1000) + 86400 * 180 // 6 months
    );
  });
  
  describe("Deployment", function () {
    it("Should set correct farm details", async function () {
      expect(await farmToken.farmName()).to.equal("Test Farm");
      expect(await farmToken.cropType()).to.equal("Maize");
      expect(await farmToken.maxSupply()).to.equal(1000);
    });
  });
  
  describe("Token Purchase", function () {
    it("Should allow token purchase", async function () {
      const tokenAmount = 10;
      const cost = ethers.parseEther("1"); // 10 * 0.1 ETH
      
      await farmToken.connect(investor).purchaseTokens(tokenAmount, {
        value: cost
      });
      
      expect(await farmToken.balanceOf(investor.address)).to.equal(tokenAmount);
      expect(await farmToken.investmentAmount(investor.address)).to.equal(cost);
    });
    
    it("Should refund excess payment", async function () {
      const tokenAmount = 10;
      const overpayment = ethers.parseEther("2"); // paying 2 ETH for 1 ETH worth
      
      const balanceBefore = await ethers.provider.getBalance(investor.address);
      
      const tx = await farmToken.connect(investor).purchaseTokens(tokenAmount, {
        value: overpayment
      });
      
      const receipt = await tx.wait();
      const gasCost = receipt.gasUsed * receipt.gasPrice;
      const balanceAfter = await ethers.provider.getBalance(investor.address);
      
      // Should have spent only 1 ETH + gas
      const expectedBalance = balanceBefore - ethers.parseEther("1") - gasCost;
      expect(balanceAfter).to.be.closeTo(expectedBalance, ethers.parseEther("0.001"));
    });
  });
});
