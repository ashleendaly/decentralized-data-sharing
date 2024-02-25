"use client";

import { ReactNode } from "react";
import EthersProvider from "../contexts/ethers";

export function Providers({ children }: { children: ReactNode }) {
  return <EthersProvider>{children}</EthersProvider>;
}
