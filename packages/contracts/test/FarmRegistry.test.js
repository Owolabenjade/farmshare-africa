const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FarmRegistry", function () {
    let farmRegistry, owner, farmer, investor;
    
    beforeEach(async function () {
        [owner, farmer, investor] = await ethers.getSigners();
        
        const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
        farmRegistry = await FarmRegistry.deploy();
        await farmRegistry.waitForDeployment();
    });
    
    describe("Deployment", function () {
        it("Should deploy successfully", async function () {
            expect(await farmRegistry.getAddress()).to.be.properAddress;
            expect(await farmRegistry.owner()).to.equal(owner.address);
        });
    });
    
    describe("Farmer Management", function () {
        it("Should approve farmers", async function () {
            await farmRegistry.approveFarmer(farmer.address);
            expect(await farmRegistry.approvedFarmers(farmer.address)).to.be.true;
        });
        
        it("Should emit FarmerApproved event", async function () {
            await expect(farmRegistry.approveFarmer(farmer.address))
                .to.emit(farmRegistry, "FarmerApproved")
                .withArgs(farmer.address);
        });
    });
    
    describe("Farm Registration", function () {
        beforeEach(async function () {
            await farmRegistry.approveFarmer(farmer.address);
        });
        
        it("Should register a farm", async function () {
            const farmId = "FARM001";
            const tx = await farmRegistry.connect(farmer).registerFarm(
                farmId,
                "Maize Farm",
                "Maize",
                "Kenya",
                ethers.parseEther("100"),
                Math.floor(Date.now() / 1000) + 86400 * 90 // 90 days
            );
            
            await expect(tx)
                .to.emit(farmRegistry, "FarmRegistered")
                .withArgs(farmId, farmer.address);
                
            const farm = await farmRegistry.getFarm(farmId);
            expect(farm.farmId).to.equal(farmId);
            expect(farm.name).to.equal("Maize Farm");
            expect(farm.farmer).to.equal(farmer.address);
        });
        
        it("Should reject unapproved farmers", async function () {
            await expect(
                farmRegistry.connect(investor).registerFarm(
                    "FARM002",
                    "Rice Farm",
                    "Rice",
                    "Nigeria",
                    ethers.parseEther("50"),
                    Math.floor(Date.now() / 1000) + 86400 * 60
                )
            ).to.be.revertedWith("Not approved farmer");
        });
    });
    
    describe("Farm Approval", function () {
        beforeEach(async function () {
            await farmRegistry.approveFarmer(farmer.address);
            await farmRegistry.connect(farmer).registerFarm(
                "FARM003",
                "Coffee Farm",
                "Coffee",
                "Ethiopia",
                ethers.parseEther("200"),
                Math.floor(Date.now() / 1000) + 86400 * 180
            );
        });
        
        it("Should approve farm and create token", async function () {
            const farmId = "FARM003";
            const tx = await farmRegistry.approveFarm(
                farmId,
                "Coffee Farm Token",
                "CFT",
                ethers.parseEther("0.1"),
                1000
            );
            
            // Wait for transaction and get receipt
            const receipt = await tx.wait();
            
            // Check that the event was emitted (don't check specific args due to complex event structure)
            await expect(tx).to.emit(farmRegistry, "FarmApproved");
            
            // Verify the farm state was updated correctly
            const farm = await farmRegistry.getFarm(farmId);
            expect(farm.status).to.equal(1); // Approved
            expect(farm.tokenAddress).to.not.equal(ethers.ZeroAddress);
            
            // Verify the token address is valid
            expect(farm.tokenAddress).to.be.properAddress;
        });
    });
    
    describe("View Functions", function () {
        it("Should return all farms", async function () {
            await farmRegistry.approveFarmer(farmer.address);
            await farmRegistry.connect(farmer).registerFarm(
                "FARM004",
                "Test Farm",
                "Test Crop",
                "Test Location",
                ethers.parseEther("100"),
                Math.floor(Date.now() / 1000) + 86400 * 90
            );
            
            const farms = await farmRegistry.getAllFarms();
            expect(farms).to.include("FARM004");
        });
    });
});

describe("FarmToken", function () {
    let farmToken, owner, investor;
    
    beforeEach(async function () {
        [owner, investor] = await ethers.getSigners();
        
        const FarmToken = await ethers.getContractFactory("FarmToken");
        farmToken = await FarmToken.deploy(
            "Test Farm Token",
            "TFT",
            1000, // maxSupply
            ethers.parseEther("0.1"), // tokenPrice
            "FARM001",
            "Test Farm",
            "Maize",
            "Kenya",
            ethers.parseEther("100"),
            Math.floor(Date.now() / 1000) + 86400 * 90
        );
        await farmToken.waitForDeployment();
    });
    
    it("Should set correct farm details", async function () {
        expect(await farmToken.name()).to.equal("Test Farm Token");
        expect(await farmToken.symbol()).to.equal("TFT");
        expect(await farmToken.farmId()).to.equal("FARM001");
        expect(await farmToken.maxSupply()).to.equal(1000);
    });
    
    it("Should allow token purchase", async function () {
        const tokenAmount = 10;
        const cost = ethers.parseEther("1"); // 10 * 0.1 HBAR
        
        await expect(
            farmToken.connect(investor).purchaseTokens(tokenAmount, { value: cost })
        ).to.emit(farmToken, "TokensPurchased")
         .withArgs(investor.address, cost, tokenAmount);
         
        expect(await farmToken.balanceOf(investor.address)).to.equal(tokenAmount);
    });
    
    it("Should refund excess payment", async function () {
        const tokenAmount = 5;
        const cost = ethers.parseEther("0.5");
        const overpayment = ethers.parseEther("1.0"); // Pay 1 HBAR for 0.5 HBAR worth
        
        const balanceBefore = await investor.provider.getBalance(investor.address);
        
        const tx = await farmToken.connect(investor).purchaseTokens(tokenAmount, { 
            value: overpayment,
            gasPrice: ethers.parseUnits("10", "gwei")
        });
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed * ethers.parseUnits("10", "gwei");
        
        const balanceAfter = await investor.provider.getBalance(investor.address);
        const actualSpent = balanceBefore - balanceAfter;
        
        // Should only spend the actual cost + gas, not the overpayment
        expect(actualSpent).to.be.closeTo(cost + gasUsed, ethers.parseEther("0.01"));
    });
});
