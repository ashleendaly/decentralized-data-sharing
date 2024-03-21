import { encrypt, EthEncryptedData } from "@metamask/eth-sig-util";
import Web3 from "web3";

export function ethEncrypt(publicKey: Buffer, data: string): EthEncryptedData {
  const enc = encrypt({
    // @ts-ignore
    publicKey: publicKey,
    data: data,
    version: "x25519-xsalsa20-poly1305",
  });

  return enc;
}

export async function ethDecrypt(account: string, data: any): Promise<string> {
  const ct = `0x${Buffer.from(JSON.stringify(data), "utf8").toString("hex")}`;
  const decrypt = await window.ethereum.request({
    method: "eth_decrypt",
    params: [ct, account],
  });
  return decrypt;
}

export async function signMessage(message: string, address: string) {
  const hashedMessage = Web3.utils.sha3(message);

  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [hashedMessage, address],
  });
  const r = signature.slice(0, 66) as string;
  const s = ("0x" + signature.slice(66, 130)) as string;
  const v = parseInt(signature.slice(130, 132), 16);

  return { hashedMessage, v, r, s };
}
