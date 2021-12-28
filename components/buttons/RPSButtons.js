import Image from "next/image";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import rocklogo from "../../public/rocklogo.png";
import paperlogo from "../../public/paperlogo.png";
import scissorslogo from "../../public/scissorslogo.png";
import { otterdollarcontractaddress } from "../../.config";
import OtterdollarABI from "../../artifacts/contracts/Otterdollar.sol/Otterdollar.json";

export function RockButton(props) {
  const { library } = useWeb3React();

  const playRock = async () => {
    try {
      const signer = library.getSigner();
      const otterDollar = new ethers.Contract(
        otterdollarcontractaddress,
        OtterdollarABI.abi,
        signer
      );

      //otterDollar.off("GamePlayed");
      // Or otterDollar.removeAllListeners

      otterDollar.removeAllListeners("GamePlayed");

      otterDollar.once("GamePlayed", (gameReturnValue) => {
        console.log("Game Return Value:", parseInt(gameReturnValue));
        console.log("Game Return Value in BigNumber:", gameReturnValue);
        let res = parseInt(gameReturnValue);
        console.log("Res", res);
        props.setResult(res);
        props.setPlayed(true);
      });
      const tx = await otterDollar.playGame(0, {
        value: ethers.utils.parseEther("0.025"),
      });
      await tx.wait();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button onClick={playRock}>
      <Image src={rocklogo} height="200" width="200"></Image>
    </button>
  );
}

export function PaperButton(props) {
  const { library } = useWeb3React();

  const playPaper = async () => {
    try {
      const signer = library.getSigner();
      const otterDollar = new ethers.Contract(
        otterdollarcontractaddress,
        OtterdollarABI.abi,
        signer
      );

      //otterDollar.off("GamePlayed");
      // Or otterDollar.removeAllListeners

      otterDollar.removeAllListeners("GamePlayed");

      otterDollar.once("GamePlayed", (gameReturnValue) => {
        console.log("Game Return Value:", parseInt(gameReturnValue));
        console.log("Game Return Value in BigNumber:", gameReturnValue);
        let res = parseInt(gameReturnValue);
        console.log("Res", res);
        props.setResult(res);
        props.setPlayed(true);
      });
      const tx = await otterDollar.playGame(1, {
        value: ethers.utils.parseEther("0.025"),
      });
      await tx.wait();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button onClick={playPaper}>
      <Image src={paperlogo} height="200" width="200"></Image>
    </button>
  );
}

export function ScissorsButton(props) {
  const { library } = useWeb3React();

  const playScissors = async () => {
    try {
      const signer = library.getSigner();
      const otterDollar = new ethers.Contract(
        otterdollarcontractaddress,
        OtterdollarABI.abi,
        signer
      );

      //otterDollar.off("GamePlayed");
      // Or otterDollar.removeAllListeners

      otterDollar.removeAllListeners("GamePlayed");

      otterDollar.once("GamePlayed", (gameReturnValue) => {
        console.log("Game Return Value:", parseInt(gameReturnValue));
        console.log("Game Return Value in BigNumber:", gameReturnValue);
        let res = parseInt(gameReturnValue);
        console.log("Res", res);
        props.setResult(res);
        props.setPlayed(true);
      });
      const tx = await otterDollar.playGame(2, {
        value: ethers.utils.parseEther("0.025"),
      });
      await tx.wait();
      console.log("Transaction:", tx);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button onClick={playScissors}>
      <Image src={scissorslogo} height="200" width="200"></Image>
    </button>
  );
}

export function PlayAgain(props) {
  function playAgain() {
    props.setPlayed(false);
  }

  return (
    <button
      onClick={playAgain}
      className="bg-yellow-600 px-4 py-2 rounded-md text-black border-2 border-black font-mono"
    >
      Play Again
    </button>
  );
}
