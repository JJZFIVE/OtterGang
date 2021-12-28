import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

import { otterdollarcontractaddress } from "../.config";
import { marketcontractaddress } from "../.config";
import { nftcontractaddress } from "../.config";

import { projectId } from "../.secret";

import OtterdollarABI from "../artifacts/contracts/Otterdollar.sol/Otterdollar.json";
import NFTABI from "../artifacts/contracts/NFT.sol/NFT.json";
import MarketplaceABI from "../artifacts/contracts/Marketplace.sol/Marketplace.json";

// Remember to call approve before buy
export default function Marketplace() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const { account, activate, active, library, deactivate } = useWeb3React();

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    // const dic_net = {
    //   name: "maticmum",
    //   chainId: 80001,
    //   _defaultProvider: (providers) =>
    //     new providers.JsonRpcProvider(
    //       `https://polygon-mumbai.infura.io/v3/${projectId}`
    //     ),
    // };

    // const provider = ethers.getDefaultProvider(dic_net);

    const provider = new ethers.providers.JsonRpcProvider(
      // Mumbai
      `https://polygon-mumbai.infura.io/v3/${projectId}`
    );

    console.log(provider);

    const marketContract = new ethers.Contract(
      marketcontractaddress,
      MarketplaceABI.abi,
      provider
    );
    const nftContract = new ethers.Contract(
      nftcontractaddress,
      NFTABI.abi,
      provider
    );

    const data = await marketContract.fetchAllUnsold();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price;
        {
          i.soldForOtterDollars
            ? (price = ethers.utils.formatUnits(i.price.toString(), "ether"))
            : (price = ethers.utils.formatUnits(i.price.toString(), "wei"));
        }
        let item = {
          price,
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
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold); // not needed since I'm only returning unsold items
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }

  return (
    <div>
      <p>Marketplace</p>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                {i.soldForOtterDollars ? (
                  <p className="text-2xl font-bold text-white">
                    Price: {nft.price} Matic
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-white">
                    Price: {nft.price} OtterDollars
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
