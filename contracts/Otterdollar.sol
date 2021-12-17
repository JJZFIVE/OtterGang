// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OtterDollar is ERC20, Ownable {
    uint gameplayAmount = 0.025 ether;
    

    constructor() ERC20("OtterDollar", "OTD") {
    }

    function setGameplayAmount(uint _amount) public onlyOwner {
        gameplayAmount = _amount;
    }

    // 0 = rock, 1 = paper, 2 = scissors
    // 0 = loss, 1 = win, 2 = tie
    function playGame(uint _playerDecision) external payable returns (uint) {
        require(msg.value == gameplayAmount, "Msg value is not the required gameplay amount");
        uint256 opponentDecision = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % 3;
        uint gameResult = wonGame(_playerDecision, opponentDecision);
        payable(owner()).transfer(msg.value);
        if (gameResult == 1) {
            _mint(msg.sender, 1);
            return 1;
        }
        else if (gameResult == 0) {
            return 0;
        }
        else {
            return 2;
        }
    }

    function wonGame(uint _player, uint _opponent) internal pure returns (uint) {
        if (_player == 0) {
            if (_opponent == 0) {return 2;}
            else if (_opponent == 1) {return 0;}
            else {return 1;}
        }
        else if (_player == 1) {
            if (_opponent == 0) {return 1;}
            else if (_opponent == 1) {return 2;}
            else {return 0;}
        }
        else {
            if (_opponent == 0) {return 0;}
            else if (_opponent == 1) {return 1;}
            else {return 2;}
        }
    } 
}