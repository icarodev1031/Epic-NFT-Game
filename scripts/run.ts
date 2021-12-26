import { Signer } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
  let accounts: Signer[];
  accounts = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("ERC20Token");

  const tokenContract = await tokenFactory.deploy();
  await tokenContract.deployed();
  console.log("[LOG] Token contract deployed");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(`err`, err);
    process.exit(1);
  }
};

runMain();
