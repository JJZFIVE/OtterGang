require("@nomiclabs/hardhat-waffle");

// import { projectId, privateKey } from "./.secret"; // Cannot import outside module
// Change this to environment varaiables

const projectId = "aaeed221b445414bad88c6a438cf26c3"; // from infura
const privateKey =
  "ed0097189a0e047f82da4ea02801f21bc26d1e7432decf1763908f371f264bfc"; // private dev wallet key

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
};
