const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("🚀 Deploying contracts with the account:", deployer.address);
    console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());
    
    // Deploy FarmRegistry
    console.log("\n📋 Deploying FarmRegistry...");
    const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
    const farmRegistry = await FarmRegistry.deploy();
    await farmRegistry.waitForDeployment();
    
    const farmRegistryAddress = await farmRegistry.getAddress();
    console.log("✅ FarmRegistry deployed to:", farmRegistryAddress);
    
    // Log deployment information
    console.log("\n🎉 Deployment completed!");
    console.log("📝 Contract Details:");
    console.log("- FarmRegistry:", farmRegistryAddress);
    console.log("- Network:", hre.network.name);
    console.log("- Deployer:", deployer.address);
    
    // Log for frontend configuration
    console.log("\n🔧 Frontend Configuration:");
    console.log(`NEXT_PUBLIC_FARM_REGISTRY_ADDRESS=${farmRegistryAddress}`);
    console.log(`NEXT_PUBLIC_HEDERA_NETWORK=${hre.network.name}`);
    
    return farmRegistryAddress;
}

// Execute deployment
if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error("❌ Deployment failed:", error);
            process.exit(1);
        });
}

module.exports = main;
