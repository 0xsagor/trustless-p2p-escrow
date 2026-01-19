// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, DISPUTED, REFUNDED }

    address public buyer;
    address public seller;
    address public arbiter;
    uint256 public price;
    State public state;

    event PaymentDeposited(address indexed buyer, uint256 amount);
    event FundsReleased(address indexed seller, uint256 amount);
    event DisputeRaised(address indexed initiator);
    event DisputeResolved(address indexed winner, uint256 amount);

    constructor(address _buyer, address _seller, address _arbiter, uint256 _price) {
        buyer = _buyer;
        seller = _seller;
        arbiter = _arbiter;
        price = _price;
        state = State.AWAITING_PAYMENT;
    }

    // 1. Buyer sends ETH to contract
    function deposit() external payable {
        require(msg.sender == buyer, "Only buyer");
        require(state == State.AWAITING_PAYMENT, "Already paid");
        require(msg.value == price, "Incorrect amount");

        state = State.AWAITING_DELIVERY;
        emit PaymentDeposited(msg.sender, msg.value);
    }

    // 2. Buyer confirms receipt, releasing ETH to Seller
    function confirmDelivery() external {
        require(msg.sender == buyer, "Only buyer");
        require(state == State.AWAITING_DELIVERY, "Not awaiting delivery");

        state = State.COMPLETE;
        payable(seller).transfer(address(this).balance);
        emit FundsReleased(seller, price);
    }

    // 3. Either party can complain
    function raiseDispute() external {
        require(msg.sender == buyer || msg.sender == seller, "Not party to transaction");
        require(state == State.AWAITING_DELIVERY, "Cannot dispute now");

        state = State.DISPUTED;
        emit DisputeRaised(msg.sender);
    }

    // 4. Arbiter decides the winner
    function resolveDispute(address winner) external {
        require(msg.sender == arbiter, "Only arbiter");
        require(state == State.DISPUTED, "Not disputed");
        require(winner == buyer || winner == seller, "Invalid winner");

        state = (winner == buyer) ? State.REFUNDED : State.COMPLETE;
        payable(winner).transfer(address(this).balance);
        
        emit DisputeResolved(winner, address(this).balance);
    }
}
