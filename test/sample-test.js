const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("All Tests", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Otterdollar = await ethers.getContractFactory("Otterdollar");
    const otterdollar = await Otterdollar.deploy();
    await otterdollar.deployed();
    //console.log("OtterDollar deployed to:", otterdollar.address);

    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(otterdollar.address);
    await marketplace.deployed();
    //console.log("Marketplace deployed to:", marketplace.address);

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketplace.address);
    await nft.deployed();
    // console.log("NFT deployed to:", nft.address);

    // console.log(await otterdollar.playGame(5));
    // console.log(await marketplace.fetchAllUnsold());
    expect(1).to.equal(1);
  });
});
