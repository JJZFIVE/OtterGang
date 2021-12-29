import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import BuyMaticButton from "../components/buttons/BuyMaticButton";
import BuyOtterDollarButton from "../components/buttons/BuyOtterDollarButton";

import { marketcontractaddress } from "../.config";
import { nftcontractaddress } from "../.config";

import { projectId } from "../.secret";

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
            ? (price = ethers.utils.formatUnits(i.price.toString(), "wei"))
            : (price = ethers.utils.formatUnits(i.price.toString(), "wei")); // Ultimately change to ether
        }
        let item = {
          price,
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
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold); // not needed since I'm only returning unsold items
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }

  return (
    <div>
      <div className="p-4">
        <h2 className="text-3xl py-2 flex justify-center">Items Created</h2>
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
                {nft.soldForOtterDollars ? (
                  <div>
                    <p className="text-2xl font-bold text-gray-200">
                      Price: {nft.price} Matic
                    </p>
                    {active ? (
                      <BuyMaticButton nft={nft} />
                    ) : (
                      <p className="text-gray-300">Connect Wallet to Buy</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold text-gray-200">
                      Price: {nft.price} OtterDollars
                    </p>
                    {active ? (
                      <BuyOtterDollarButton nft={nft} />
                    ) : (
                      <p className="text-gray-300">Connect Wallet to Buy</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
