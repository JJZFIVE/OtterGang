import Image from "next/image";
import { ethers } from "ethers";
import { useState } from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../InjectedProvider";

import rocklogo from "../../public/rocklogo.png";
import paperlogo from "../../public/paperlogo.png";
import scissorslogo from "../../public/scissorslogo.png";
import {
  otterdollarcontractaddress,
  marketcontractaddress,
  nftcontractaddress,
} from "../../.config";
import OtterdollarABI from "../../artifacts/contracts/Otterdollar.sol/Otterdollar.json";
import NFTABI from "../../artifacts/contracts/NFT.sol/NFT.json";
import MarketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";

export function RockButton() {
  return (
    <button>
      <Image src={rocklogo} height="200" width="200"></Image>
    </button>
  );
}

export function PaperButton() {
  return (
    <button>
      <Image src={paperlogo} height="200" width="200"></Image>
    </button>
  );
}

export function ScissorsButton() {
  return (
    <button>
      <Image src={scissorslogo} height="200" width="200"></Image>
    </button>
  );
}

export function WimpOut() {
  return (
    <button className="bg-yellow-500 border-black px-4 py-2 border-2 rounded-lg text-black">
      Wimp Out
    </button>
  );
}
