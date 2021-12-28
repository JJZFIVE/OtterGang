import Link from "next/link";
import Image from "next/image";
import otterganglogo from "../public/otterganglogo.png";
import ConnectButton from "./buttons/ConnectButton";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

export default function Navbar() {
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
    <header className="bg-yellow-900">
      <div className="flex justify-between">
        <div className="max-w-2xl pl-5">
          <ul className="flex space-x-6 text-gray-200 text-xl items-center font-mono">
            <Link href="/">
              <li>
                <button>
                  <Image
                    src={otterganglogo}
                    alt="Otter Gang Logo"
                    width="150"
                    height="75"
                  ></Image>
                </button>
              </li>
            </Link>
            <Link href="/play">
              <li>
                <button>Play</button>
              </li>
            </Link>
            <Link href="/marketplace">
              <li>
                <button>Marketplace</button>
              </li>
            </Link>
            <Link href="/my-otters">
              <li>
                <button>My Otters</button>
              </li>
            </Link>
            <Link href="/about">
              <li>
                <button>About</button>
              </li>
            </Link>
            <Link href="/create-nft">
              <li>
                <button>C</button>
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center pr-10">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
