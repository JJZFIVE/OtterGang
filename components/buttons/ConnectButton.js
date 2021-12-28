import { injected } from "../InjectedProvider";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

export default function ConnectButton() {
  const { account, activate, active } = useWeb3React();
  const [buttontext, setButtontext] = useState();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    try {
      let acc = account;
      setButtontext(
        acc.substring(0, 5) + "..." + acc.substring(acc.length - 5, acc.length)
      );
    } catch (ex) {
      console.log(ex);
    }
  }, [account]);

  return (
    <div>
      <button
        onClick={connect}
        className="bg-yellow-600 px-4 py-2 rounded-md text-black border-2 border-black font-mono"
      >
        {active ? <p>{buttontext}</p> : <p>Connect Wallet</p>}
      </button>
    </div>
  );
}
