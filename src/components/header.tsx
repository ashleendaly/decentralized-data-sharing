"use client";

import { EthersContext } from "@/contexts/ethers";
import { useContext } from "react";

export default function Header() {
  const { address } = useContext(EthersContext);

  return (
    <div className="bg-slate-800 text-white p-3">
      {address && <pre>Connected Wallet: {address}</pre>}
    </div>
  );
}
