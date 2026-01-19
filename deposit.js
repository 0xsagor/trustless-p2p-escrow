const { ethers } = require("hardhat");
const config = require("./escrow_config.json");

async function main() {
    const [buyer] = await ethers.getSigners();
    
    // Check if user updated the config file
    if (!config.escrow) {
        console.error("Error: Please set 'escrow' address in escrow_config.json");
        return;
    }

    const escrow = await ethers.getContractAt("Escrow", config.escrow, buyer);
    const price = await escrow.price();

    console.log(`Depositing ${ethers.formatEther(price)} ETH...`);
    
    const tx = await escrow.deposit({ value: price });
    await tx.wait();

    console.log("Funds Locked in Escrow!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
