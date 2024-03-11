"use client";

import { ReactNode } from "react";
import EthersProvider from "../contexts/ethers";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EthersProvider>
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        secretKey={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}
        authConfig={{
          domain: process.env.APP_URL || "localhost:3000",
          authUrl: "/api/auth",
        }}
      >
        {children}
      </ThirdwebProvider>
    </EthersProvider>
  );
}
