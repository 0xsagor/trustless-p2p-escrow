# Trustless P2P Escrow

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![Security](https://img.shields.io/badge/status-audited-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## Overview

**Trustless P2P Escrow** replaces middlemen like PayPal or Upwork. It holds funds neutrally on the blockchain. The funds can only move in two ways:
1.  **Happy Path**: Buyer receives item -> Buyer releases funds to Seller.
2.  **Dispute Path**: Buyer/Seller raises dispute -> Arbiter decides who gets the funds.

## Roles

* **Buyer**: Deposits funds.
* **Seller**: Provides good/service.
* **Arbiter**: A trusted third party (only needed if things go wrong).

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Escrow Factory
npx hardhat run deploy.js --network localhost

# 3. Create a Transaction (Buyer deposits ETH)
node create_escrow.js

# 4. Release Funds (Buyer confirms receipt)
node release_funds.js

# 5. Handling Disputes (Optional)
node raise_dispute.js
node resolve_dispute.js
