import { ethers } from "ethers";
import { useState } from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/InjectedProvider";
import {
  RockButton,
  PaperButton,
  ScissorsButton,
  PlayAgain,
} from "../components/buttons/RPSButtons";

export default function Play() {
  const [played, setPlayed] = useState(false);
  const [result, setResult] = useState(0);
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

  if (active) {
    if (played == false) {
      return (
        <div className="flex flex-col items-center font-mono text-xl mt-20">
          <p className="content-center text-3xl">Rock Paper Scissors</p>
          <p className="content-center mt-8">
            Your furry opponent has selected its move. Choose wisely.
          </p>
          <div className="flex justify-between w-1/2 mt-10">
            <RockButton setPlayed={setPlayed} setResult={setResult} />
            <PaperButton setPlayed={setPlayed} setResult={setResult} />
            <ScissorsButton setPlayed={setPlayed} setResult={setResult} />
          </div>
        </div>
      );
    } else {
      if (result == 0) {
        return (
          <div className="flex flex-col items-center font-mono text-xl mt-20">
            <p>You lost :(</p>
            <PlayAgain setPlayed={setPlayed} />
          </div>
        );
      } else if (result == 1) {
        return (
          <div className="flex flex-col items-center font-mono text-xl mt-20">
            <p>You won!</p>
            <p className="text-md">Here's your otterdollar</p>
            <PlayAgain setPlayed={setPlayed} />
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center font-mono text-xl mt-20">
            <p>You tied...</p>
            <p>Result: {result}</p>
            <PlayAgain setPlayed={setPlayed} />
          </div>
        );
      }
    }
  } else {
    return (
      <div className="flex flex-col items-center font-mono text-xl mt-20">
        <p className="content-center text-3xl">Connect your wallet to play</p>
      </div>
    );
  }
}
