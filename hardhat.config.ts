import "@nomiclabs/hardhat-waffle";
import { task } from "hardhat/config";
require("dotenv").config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork:"rinkeby_testnet",
  networks: {
    hardhat: {},
    rinkeby_testnet: {
      // url: `https://eth-rinkeby.alchemyapi.io/v2/IHQE1lz1lYZ203cAHY-IF_gh5fjJA6LF`,
      url:"https://rinkeby.infura.io/v3/0c9e3b1bd162495d99b6995e84d166fd",
      network_id:4,
      allowUnlimitedContractSize: true,
      accounts: [`0x${process.env.PRIVATEKEY}`]
    },
  },
};
