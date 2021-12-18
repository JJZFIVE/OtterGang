import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import { otterdollarcontractaddress } from "../../.config";
import OtterdollarABI from "../../artifacts/contracts/Otterdollar.sol/Otterdollar.json";

export default function Marketplace() {
  const {
    account,
    activate,
    active,
    chainId,
    connector,
    library,
    deactivate,
    error,
    provider,
    setError,
  } = useWeb3React();

  return (
    <div>
      <p>Marketplace</p>
    </div>
  );
}
