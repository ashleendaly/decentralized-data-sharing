import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";

// import AttributeTokenContract from "../contracts/AttributeToken.json";

type EthersContextType = {
  signer: ethers.providers.JsonRpcSigner | undefined;
  address: string;
};

export const EthersContext = createContext<EthersContextType>({
  signer: undefined,
  address: "",
});

interface EthersProviderProps {
  children: ReactNode;
}

const EthersProvider: React.FC<EthersProviderProps> = ({ children }) => {
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >(undefined);

  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    async function initializeEthers() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAddress(address);
      }
    }

    initializeEthers();
  }, []);

  return (
    <EthersContext.Provider value={{ signer, address }}>
      {children}
    </EthersContext.Provider>
  );
};

export default EthersProvider;
