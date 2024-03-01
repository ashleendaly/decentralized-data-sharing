"use client";

import { EthersContext } from "@/contexts/ethers";
import Link from "next/link";
import { useContext } from "react";

export default function Header() {
  const { metaMaskAddresss } = useContext(EthersContext);

  return (
    <div className="bg-slate-800 text-white p-3 flex justify-between h-[5vh]">
      <div className="flex gap-5">
        <Link href={"/upload"}>Upload</Link>
        <Link href={"/request"}>Request</Link>
        <Link href={"/view"}>View</Link>
        <Link href={"/tokens"}>Tokens</Link>
      </div>
      <div>
        {!metaMaskAddresss && <p>Connecting Wallet...</p>}
        {metaMaskAddresss && <pre>Connected Wallet: {metaMaskAddresss}</pre>}
      </div>
    </div>
  );
}
