"use client";

import { useAddress, useConnect, metamaskWallet } from "@thirdweb-dev/react";

export default function Header() {
  const metamaskConfig = metamaskWallet();
  const address = useAddress();
  const connect = useConnect();

  return (
    <div className="bg-slate-800 text-white p-3">
      {!address && (
        <button onClick={() => connect(metamaskConfig)}>Connect</button>
      )}
      {address && <pre>Connected Wallet: {address}</pre>}
    </div>
  );
}
