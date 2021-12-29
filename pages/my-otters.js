import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import SellNFTButton from "../components/buttons/SellNFTButton";

import { marketcontractaddress } from "../.config";
import { nftcontractaddress } from "../.config";

import NFTABI from "../artifacts/contracts/NFT.sol/NFT.json";
import MarketplaceABI from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

export default function MyOtters() {
  const { active, account, library } = useWeb3React();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function fetchMyNFTs() {
      const signer = library.getSigner();
      const marketContract = new ethers.Contract(
        marketcontractaddress,
        MarketplaceABI.abi,
        signer
      );

      const nftContract = new ethers.Contract(
        nftcontractaddress,
        NFTABI.abi,
        signer
      );

      const data = await marketContract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await nftContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let item = {
            itemId: i.itemId.toNumber(),
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            soldForOtterDollars: i.soldForOtterDollars,
            image: meta.data.image,
          };
          return item;
        })
      );
      setNfts(items);
    }

    fetchMyNFTs();
  }, []);
  return (
    <div>
      <div className="p-4">
        <h2 className="text-3xl py-2 flex justify-center">My Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div
              key={i}
              className="border shadow rounded-xl overflow-hidden max-h-96"
            >
              <img
                src={nft.image}
                className="rounded rounded-b-none h-72"
                width="100%"
                height="100%"
              />
              <div className="p-4 text-center bg-yellow-700">
                <p>{nft.tokenId}</p>
                <SellNFTButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
