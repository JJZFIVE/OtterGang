import { ethers } from "ethers";
import { useState } from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/InjectedProvider";
import {
  RockButton,
  PaperButton,
  ScissorsButton,
  WimpOut,
} from "../components/buttons/RPSButtons";

export default function Play() {
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
    <div className="flex flex-col items-center font-mono text-xl mt-20">
      <p className="content-center text-3xl">Rock Paper Scissors</p>
      <p className="content-center mt-8">
        Your furry opponent has selected its move. Choose wisely.
      </p>
      <div className="flex justify-between w-1/2 mt-10">
        <RockButton />
        <PaperButton />
        <ScissorsButton />
      </div>
      <div className="mt-10">
        <WimpOut />
      </div>
    </div>
  );
}
