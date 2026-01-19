const { ethers } = require("hardhat");
const config = require("./escrow_config.json");

async function main() {
    const [buyer] = await ethers.getSigners();
    const escrow = await ethers.getContractAt("Escrow", config.escrow, buyer);

    console.log("Buyer confirming delivery...");

    try {
        const tx = await escrow.confirmDelivery();
        await tx.wait();
        console.log("Funds Released to Seller! Transaction Complete.");
    } catch (e) {
        console.error("Failed:", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
