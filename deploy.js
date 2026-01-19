const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Factory with:", deployer.address);

    const Factory = await ethers.getContractFactory("EscrowFactory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();
    const address = await factory.getAddress();

    console.log("EscrowFactory Deployed:", address);

    // Save Config
    const config = { factory: address, escrow: "" };
    fs.writeFileSync("escrow_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
