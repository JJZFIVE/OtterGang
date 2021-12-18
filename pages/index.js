import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PlayButton from "../components/buttons/PlayButton";
import ExploreButton from "../components/buttons/ExploreButton";

import pixelotter1 from "../public/pixelotter1.png";

export default function Home() {
  return (
    <div className="font-mono mt-28 flex justify-between ">
      <div className="flex flex-col ml-40 w-1/3">
        <div className="">
          <h2 className="text-3xl font-bold">Welcome to the Otter Gang</h2>
          <p className="text-xl mt-10">
            Connect your wallet to begin helping us take back clout from the
            otters
          </p>
        </div>
        <div className="mt-20 flex justify-between w-2/3">
          <PlayButton />
          <ExploreButton />
        </div>
      </div>
      <div className="mr-40 ">
        <Image src={pixelotter1} height="400" width="400"></Image>
      </div>
    </div>
  );
}
