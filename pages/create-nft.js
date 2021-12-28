import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { create as ipfsHTTPClient } from "ipfs-http-client";

const client = ipfsHTTPClient("https://ipfs.infura.io:5001/api/v0");

import { otterdollarcontractaddress } from "../.config";
import { marketcontractaddress } from "../.config";
import { nftcontractaddress } from "../.config";

import { projectId } from "../.secret";

import OtterdollarABI from "../artifacts/contracts/Otterdollar.sol/Otterdollar.json";
import NFTABI from "../artifacts/contracts/NFT.sol/NFT.json";
import MarketplaceABI from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

export default function CreateNFT() {
  const { account, active, library } = useWeb3React();
  const [fileUrl, setFileUrl] = useState("");
  const [forminput, setForminput] = useState({ name: "", price: "" });
  const [tokenId, setTokenId] = useState(0);

  async function onFileChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
      console.log(url);
    } catch (ex) {
      console.log("Error uploading file", ex);
    }
  }

  async function createTokenURI() {
    const { name, price } = forminput;
    if (!fileUrl || !name || !price) {
      console.log("Invalid parameters");
      return null;
    }

    const data = JSON.stringify({ name, image: fileUrl });
    try {
      const added = await client.add(data);
      console.log("URI Added:", added);
      return `https://ipfs.infura.io/ipfs/${added.path}`;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  const createNFT = async (e) => {
    // if (!active) {
    //   console.log("not active");
    //   return;
    // }
    e.preventDefault();
    const uri = await createTokenURI();
    if (!uri) {
      console.log("No URI");
      return;
    }

    const signer = library.getSigner();
    const nftContract = new ethers.Contract(
      nftcontractaddress,
      NFTABI.abi,
      signer
    );

    // Subscribe to NFTCreated Event
    nftContract.removeAllListeners("NFTCreated");

    nftContract.once("NFTCreated", (tokenId) => {
      console.log("TokenId", parseInt(tokenId));
      const id = parseInt(tokenId);
      console.log("Res", id);
      setTokenId(id);
      createMarketItem(signer, id);
    });

    const nfttx = await nftContract.createToken(uri);
    await nfttx.wait();
    console.log("NFT Transaction", nfttx);
  };

  const createMarketItem = async (signer, tokenId) => {
    const marketContract = new ethers.Contract(
      marketcontractaddress,
      MarketplaceABI.abi,
      signer
    );
    const { price } = forminput;
    const markettx = await marketContract.createMarketItemForOtterDollars(
      nftcontractaddress,
      parseInt(price),
      tokenId
    );
    await markettx.wait();
    console.log("Market Transaction", markettx);
  };

  return (
    <div className="justify-center flex">
      <div className="">
        <h3 className="mt-20 text-2xl">
          Create an NFT. Only the owner can do this.
        </h3>
        <form className="flex flex-col justify-center">
          <input className="my-4" type="file" onChange={onFileChange}></input>
          <input
            className="my-4"
            placeholder="Enter Name"
            onChange={(e) => {
              e.preventDefault();
              setForminput({ ...forminput, name: e.target.value });
            }}
          ></input>
          <input
            className="my-4"
            placeholder="Enter Price"
            onChange={(e) => {
              e.preventDefault();
              setForminput({ ...forminput, price: e.target.value });
            }}
          ></input>
          <button
            className="bg-yellow-400 px-6 py-3 rounded-md border-2 border-black"
            onClick={createNFT}
          >
            Create NFT
          </button>
        </form>
      </div>
    </div>
  );
}
