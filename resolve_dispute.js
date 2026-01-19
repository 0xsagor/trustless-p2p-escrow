const { ethers } = require("hardhat");
const config = require("./escrow_config.json");

async function main() {
    const [buyer, seller, arbiter] = await ethers.getSigners();
    const escrow = await ethers.getContractAt("Escrow", config.escrow, arbiter);

    // Arbiter decides who wins. Let's say Seller provided proof of work.
    const winner = seller.address; 
    
    console.log(`Arbiter resolving dispute in favor of Seller (${winner})...`);

    try {
        // Must be in DISPUTED state first (call raiseDispute)
        const tx = await escrow.resolveDispute(winner);
        await tx.wait();
        console.log("Dispute Resolved. Funds transferred to Winner.");
    } catch (e) {
        console.error("Resolution Failed (Is state DISPUTED?):", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
