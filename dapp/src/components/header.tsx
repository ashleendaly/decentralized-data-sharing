"use client";

import { useAddress, useConnect, metamaskWallet } from "@thirdweb-dev/react";

export default function Header() {
  const metamaskConfig = metamaskWallet();
  const address = useAddress();
  const connect = useConnect();

  return (
    <div>
      {!address && (
        <button onClick={() => connect(metamaskConfig)}>Connect</button>
      )}
      <pre>Connected Wallet: {address}</pre>
    </div>
  );
}
