import { ethers } from "ethers";

export const generateKeys = () => {
  const wallet = ethers.Wallet.createRandom();
  const seedPhrase = wallet.mnemonic?.phrase;
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  console.log({ seedPhrase, privateKey, address });
  return { seedPhrase, privateKey, address };
};

export const generateKeysFromSeedPhrase = (seedPhrase: string) => {
  const hdNode = ethers.HDNodeWallet.fromPhrase(seedPhrase);
  const privateKey = hdNode.privateKey;
  const wallet = new ethers.Wallet(privateKey);
  const address = wallet.address;
  console.log({ seedPhrase, privateKey, address });
  return { seedPhrase, privateKey, address };
};
