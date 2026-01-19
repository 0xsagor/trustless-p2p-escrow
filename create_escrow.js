const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./escrow_config.json");

async function main() {
    // Signers: 0=Buyer, 1=Seller, 2=Arbiter
    const [buyer, seller, arbiter] = await ethers.getSigners();
    const factory = await ethers.getContractAt("EscrowFactory", config.factory, buyer);

    const price = ethers.parseEther("1.0");

    console.log(`Buyer ${buyer.address} creating escrow...`);
    
    // Create the contract
    const tx = await factory.createEscrow(seller.address, arbiter.address, price);
    const receipt = await tx.wait();

    // In a real script, we parse the event. For simplicity, we assume we want the latest.
    // Ideally: receipt.logs...
    console.log("Escrow Contract Created!");

    // NOTE: In production, we'd grab address from event. 
    // For this simulation, we'll re-instantiate it using the factory logic or a getter, 
    // but here let's assume we grabbed it. 
    // *Manual Step*: You would typically paste the new address into escrow_config.json here.
    console.log("Please update escrow_config.json with the new Escrow address from the explorer/logs.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
