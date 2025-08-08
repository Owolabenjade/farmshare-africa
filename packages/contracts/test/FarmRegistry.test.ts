import { expect } from "chai";
import { ethers } from "hardhat";

describe("FarmRegistry", function () {
  let farmRegistry: any;
  let owner: any;
  let farmer: any;

  beforeEach(async function () {
    [owner, farmer] = await ethers.getSigners();
    
    const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
    farmRegistry = await FarmRegistry.deploy();
    await farmRegistry.waitForDeployment();
  });

  it("Should register a farm", async function () {
    const farmName = "Test Farm";
    const farmLocation = "Test Location";
    const totalValue = ethers.parseEther("100");
    const totalShares = 1000;

    await farmRegistry.connect(farmer).registerFarm(
      farmName,
      farmLocation,
      totalValue,
      totalShares
    );

    const farm = await farmRegistry.getFarm(1);
    expect(farm.name).to.equal(farmName);
    expect(farm.location).to.equal(farmLocation);
    expect(farm.farmer).to.equal(farmer.address);
    expect(farm.totalValue).to.equal(totalValue);
    expect(farm.totalShares).to.equal(totalShares);
    expect(farm.isActive).to.be.true;
  });

  it("Should increment farm counter", async function () {
    await farmRegistry.connect(farmer).registerFarm("Farm 1", "Location 1", 100, 100);
    await farmRegistry.connect(farmer).registerFarm("Farm 2", "Location 2", 200, 200);

    const counter = await farmRegistry.farmCounter();
    expect(counter).to.equal(2);
  });
});
