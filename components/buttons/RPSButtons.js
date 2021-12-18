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

      const result = await otterDollar.playGame(0);
      console.log(result);
      props.setPlayed(true);
      // find a way to get if you won
      if (result == 0) {
        props.setResult(0);
      } else if (result == 1) {
        props.setResult(1);
      } else {
        props.setResult(2);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button>
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

      const result = await otterDollar.playGame(1);
      console.log(result);
      props.setPlayed(true);
      // find a way to get if you won
      if (result == 0) {
        props.setResult(0);
      } else if (result == 1) {
        props.setResult(1);
      } else {
        props.setResult(2);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button>
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

      const result = await otterDollar.playGame(2);
      console.log(result);
      props.setPlayed(true);
      // find a way to get if you won
      if (result == 0) {
        props.setResult(0);
      } else if (result == 1) {
        props.setResult(1);
      } else {
        props.setResult(2);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button>
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
