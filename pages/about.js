import PlayButton from "../components/buttons/PlayButton";
import ExploreButton from "../components/buttons/ExploreButton";
import Image from "next/image";

import otter1 from "../public/otter1.jpg";

export default function About() {
  return (
    <div className="font-mono mt-28 flex justify-between ">
      <div className="flex flex-col ml-40 w-1/2">
        <div className="">
          <h2 className="text-3xl font-bold">About Otter Gang</h2>
          <p className="text-xl mt-10">
            Oh no! The otters have taken over the world! We need your help to
            regain our control from these dastardly furballs. You have one job:
            beat them in Rock Paper Scissors over and over and over again. To
            challenge an otter, first connect your MetaMask wallet. You see,
            otters have an affinity for Matic, so they won't play you unless you
            put in a small amount every time you play. If you win, your furry
            opponent will hand over an OtterDollar ERC-20 token, which can be
            used to purchase otter NFTs in the marketplace. Once an NFT has been
            purchased with OtterDollars, it can be resold on the marketplace for
            Matic, so you'll be able to make money just by playing Rock Paper
            Scissors. Now, join us in taking back clout for the human race!
          </p>
        </div>
      </div>
      <div className="mr-28 items-center flex">
        <Image
          src={otter1}
          height="350"
          width="350"
          className="rounded-2xl"
        ></Image>
      </div>
    </div>
  );
}
