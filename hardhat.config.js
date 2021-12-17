require("@nomiclabs/hardhat-waffle");

const projectId = ""; // from infura
const privateKey = ""; // private dev wallet key

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: `rinkeby url here / ${projectId}`,
    //   accounts: [privateKey],
    // },
  },
};
