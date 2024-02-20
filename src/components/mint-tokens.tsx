"use client";
import { useContract, useAddress } from "@thirdweb-dev/react";

export default function MintTokens() {
  const contractAddress = "0xD5Cb53f53A2920C4e5e62908aEE103f702a0BDE5";
  const { contract } = useContract(contractAddress);
  const walletAddress = useAddress();
  if (!walletAddress) return;

  return <div></div>;
}
