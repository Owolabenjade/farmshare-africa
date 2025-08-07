const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying FarmShare Africa contracts...");
  
  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  // Get balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  // Deploy FarmRegistry
  console.log("\n📋 Deploying FarmRegistry...");
  const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
  const farmRegistry = await FarmRegistry.deploy();
  await farmRegistry.waitForDeployment();
  
  const registryAddress = await farmRegistry.getAddress();
  console.log("✅ FarmRegistry deployed to:", registryAddress);
  
  console.log("\n🎉 Deployment completed!");
  console.log("📝 Save this address:", registryAddress);
  
  return {
    farmRegistry: registryAddress
  };
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Deployment failed:", error);
      process.exit(1);
    });
}

module.exports = main;
