import { ethers } from "ethers";

export const generateWallet = () => {
  return ethers.Wallet.createRandom();
};

export const generateWalletFromSeedPhrase = (seedPhrase: string) => {
  return ethers.HDNodeWallet.fromPhrase(seedPhrase);
};
