// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Escrow.sol";

contract EscrowFactory {
    event EscrowCreated(address escrowAddress, address buyer, address seller, uint256 price);

    function createEscrow(address _seller, address _arbiter, uint256 _price) external returns (address) {
        Escrow newEscrow = new Escrow(msg.sender, _seller, _arbiter, _price);
        emit EscrowCreated(address(newEscrow), msg.sender, _seller, _price);
        return address(newEscrow);
    }
}
