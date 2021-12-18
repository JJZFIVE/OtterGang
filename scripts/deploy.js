const hre = require("hardhat");

async function main() {
  const Otterdollar = await hre.ethers.getContractFactory("Otterdollar");
  const otterdollar = await Otterdollar.deploy();
  await otterdollar.deployed();
  console.log("OtterDollar deployed to:", otterdollar.address);

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(otterdollar.address);
  await marketplace.deployed();
  console.log("Marketplace deployed to:", marketplace.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(marketplace.address);
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
