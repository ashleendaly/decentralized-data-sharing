import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";

type EthersContextType = {
  signer: ethers.providers.JsonRpcSigner | undefined;
  metaMaskAddresss: string;
  metaMaskPk: string;
};

export const EthersContext = createContext<EthersContextType>({
  signer: undefined,
  metaMaskAddresss: "",
  metaMaskPk: "",
});

interface EthersProviderProps {
  children: ReactNode;
}

const EthersProvider: React.FC<EthersProviderProps> = ({ children }) => {
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >(undefined);

  const [metaMaskAddresss, setMetaMaskAddresss] = useState<string>("");
  const [metaMaskPk, setMetaMaskPk] = useState<string>("");

  useEffect(() => {
    async function initializeEthers() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setMetaMaskAddresss(address);

        const pk = (await window.ethereum.request({
          method: "eth_getEncryptionPublicKey",
          params: [address],
        })) as string;
        setMetaMaskPk(pk);
      }
    }

    initializeEthers();
  }, []);

  return (
    <EthersContext.Provider value={{ signer, metaMaskAddresss, metaMaskPk }}>
      {children}
    </EthersContext.Provider>
  );
};

export default EthersProvider;
