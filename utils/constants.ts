// Add your smart contract address here
export const GAME_CONTRACT_ADDRESS =
  "0x69C21AE6046146631124bA5B591eD99fAA62A1B1";
export const TOKEN_CONTRACT_ADDRESS =
  "0x76d569Bb046baAC5aded77175634911b1B1345bc";

export const RINKBY_MAINNET_PARAMS = {
  chainId: "0x04",
  chainName: "Rinkeby Test Network",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rinkeby.infura.io/v3/0c9e3b1bd162495d99b6995e84d166fd"],
  blockExplorerUrls: ["https://rinkeby.etherscan.io"],
};

export const POLYGON_MAINNET_PARAMS = {
  chainId: "0x89",
  chainName: "Polygon Network",
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: [
    `https://poly-mainnet.gateway.pokt.network/v1/lb/${process.env.POCKET_TOKEN}`,
  ],
  blockExplorerUrls: ["https://polygonscan.com/"],
};

export const CHAIN_ID = "0x04";
export const CHAIN_ID_INT = 4;
