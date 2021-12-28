import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import { otterdollarcontractaddress } from "../.config";
import { marketcontractaddress } from "../.config";
import { nftcontractaddress } from "../.config";

import { projectId } from "../.secret";

import OtterdollarABI from "../artifacts/contracts/Otterdollar.sol/Otterdollar.json";
import NFTABI from "../artifacts/contracts/NFT.sol/NFT.json";
import MarketplaceABI from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

export default function CreateNFT() {
  const { account, active, library } = useWeb3React();
  const [tokenURI, setTokenURI] = useState("");
  const [tokenId, setTokenId] = useState();

  const createNFT = async () => {
    // if (!active) {
    //   console.log(tokenURI, "Not signed in");
    //   return;
    // }
    try {
      const signer = library.getSigner();
      console.log(library);
      console.log(signer);

      const nftContract = new ethers.Contract(
        nftcontractaddress,
        NFTABI.abi,
        signer
      );
      const tx = await nftContract.createToken(tokenURI);
      console.log("Transaction", tx);
    } catch (ex) {
      console.log(ex);
    }
  };

  async function createMarketItem() {
    // if (!active) {
    //   console.log(tokenId, "Not signed in");
    //   return;
    // }
    const signer = library.getSigner();

    console.log(signer);

    const marketContract = new ethers.Contract(
      marketcontractaddress,
      MarketplaceABI.abi,
      signer
    );

    const tx = await marketContract.createMarketItemForOtterDollars(
      nftcontractaddress,
      5,
      parseInt(tokenId)
    );
    console.log("Transaction", tx);
  }

  return (
    <div>
      <form>
        <input
          placeholder="Enter tokenURI"
          onChange={(e) => {
            setTokenURI(e.target.value);
          }}
        ></input>
        <button onClick={createNFT}>Create NFT</button>

        <input
          placeholder="Enter tokenId"
          onChange={(e) => {
            setTokenId(e.target.value);
          }}
        ></input>
        <button onClick={createMarketItem}>Create Market Item</button>
      </form>
      {active ? <p>{account}</p> : <p>Didnt work</p>}
    </div>
  );
}
