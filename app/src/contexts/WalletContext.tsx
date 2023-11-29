import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";

type WalletContextType = {
  wallet?: ethers.HDNodeWallet;
  setWallet: React.Dispatch<
    React.SetStateAction<ethers.HDNodeWallet | undefined>
  >;
};

export const WalletContext = createContext<WalletContextType>({
  wallet: undefined,
  setWallet: () => {
    return;
  },
});

const WalletProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [wallet, setWallet] = useState<ethers.HDNodeWallet | undefined>(
    undefined
  );

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
