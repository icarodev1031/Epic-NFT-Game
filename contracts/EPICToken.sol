// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract EPICToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * (10**18));
    }

    function faucet(address recipient, uint256 amount) external {
        require(amount <= 20 ether, "Amount must be less than 20 ether");
        _mint(recipient, amount);
    }

    function getBalance() external view returns(uint256){
        return balanceOf(msg.sender);
    }

}