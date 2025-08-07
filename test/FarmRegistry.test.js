const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FarmRegistry", function () {
  let farmRegistry;
  let owner, farmer, investor;
  
  beforeEach(async function () {
    [owner, farmer, investor] = await ethers.getSigners();
    
    const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
    farmRegistry = await FarmRegistry.deploy();
  });
  
  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await farmRegistry.owner()).to.equal(owner.address);
    });
  });
  
  describe("Farmer Management", function () {
    it("Should approve farmers", async function () {
      await farmRegistry.approveFarmer(farmer.address);
      expect(await farmRegistry.approvedFarmers(farmer.address)).to.be.true;
    });
  });
  
  describe("Farm Registration", function () {
    beforeEach(async function () {
      await farmRegistry.approveFarmer(farmer.address);
    });
    
    it("Should register a farm", async function () {
      await farmRegistry.connect(farmer).registerFarm(
        "FARM001",
        "Test Farm",
        "Maize",
        "Nigeria",
        ethers.parseEther("5"), // 5 ETH funding goal
        Math.floor(Date.now() / 1000) + 86400 * 180 // 6 months
      );
      
      const farm = await farmRegistry.farms("FARM001");
      expect(farm.name).to.equal("Test Farm");
      expect(farm.farmer).to.equal(farmer.address);
    });
    
    it("Should approve farm and create token", async function () {
      // Register farm
      await farmRegistry.connect(farmer).registerFarm(
        "FARM001",
        "Test Farm",
        "Maize",
        "Nigeria",
        ethers.parseEther("5"),
        Math.floor(Date.now() / 1000) + 86400 * 180
      );
      
      // Approve farm
      await farmRegistry.approveFarm(
        "FARM001",
        "Test Farm Token",
        "FARM001",
        ethers.parseEther("0.1"), // 0.1 ETH per token
        1000 // 1000 tokens max
      );
      
      const farm = await farmRegistry.farms("FARM001");
      expect(farm.tokenAddress).to.not.equal(ethers.ZeroAddress);
    });
  });
});
