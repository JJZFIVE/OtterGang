import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

import { otterdollarcontractaddress } from "../../.config";
import { marketcontractaddress } from "../../.config";

import OtterdollarABI from "../../artifacts/contracts/Otterdollar.sol/Otterdollar.json";
import MarketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";

export default function BuyOtterDollarButton({ nft }) {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const { account, activate, active, library } = useWeb3React();

  async function checkAllowance(otterDollarContract) {
    let allowance = await otterDollarContract.allowance(
      account,
      marketcontractaddress
    );
    const nftprice = ethers.BigNumber.from(nft.price);
    if (allowance.lt(nftprice)) {
      const tx = await otterDollarContract.approve(
        marketcontractaddress,
        115792089237
      );
    }
  }

  async function buyNFT() {
    try {
      const signer = library.getSigner();

      const marketContract = new ethers.Contract(
        marketcontractaddress,
        MarketplaceABI.abi,
        signer
      );

      const otterDollarContract = new ethers.Contract(
        otterdollarcontractaddress,
        OtterdollarABI.abi,
        signer
      );

      checkAllowance(otterDollarContract);
      console.log(nft.itemId);

      const tx = await marketContract.buyWithOtterDollars(nft.itemId);
      await tx.wait();
      console.log("transaction", tx);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <button
      onClick={buyNFT}
      className="text-lg px-4 py-1 bg-yellow-300 text-black rounded-lg border-2 border-black"
    >
      BUY
    </button>
  );
}
