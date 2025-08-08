import { ethers } from "hardhat";

async function main() {
  console.log("Deploying FarmRegistry contract...");

  const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
  const farmRegistry = await FarmRegistry.deploy();

  await farmRegistry.waitForDeployment();

  const address = await farmRegistry.getAddress();
  console.log("FarmRegistry deployed to:", address);

  // Verify contract on explorer if not local network
  if (process.env.ETHERSCAN_API_KEY && !["hardhat", "localhost"].includes(network.name)) {
    console.log("Waiting for block confirmations...");
    await farmRegistry.deploymentTransaction()?.wait(6);
    
    console.log("Verifying contract...");
    try {
      await run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
    } catch (e) {
      console.log("Verification failed:", e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
