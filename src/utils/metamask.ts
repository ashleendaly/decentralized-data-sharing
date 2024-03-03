import { encrypt, EthEncryptedData } from "@metamask/eth-sig-util";
import Web3 from "web3";

export function ethEncrypt(publicKey: Buffer, data: Buffer): EthEncryptedData {
  const enc = encrypt({
    publicKey: publicKey.toString("base64"),
    data: data.toString(),
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
  return decrypt.toString();
}

export async function signMessage(message: string, address: string) {
  const hashedMessage = Web3.utils.sha3(message);
  console.log({ hashedMessage });

  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [hashedMessage, address],
  });
  console.log({ signature });

  const r = signature.slice(0, 66);
  const s = "0x" + signature.slice(66, 130);
  const v = parseInt(signature.slice(130, 132), 16);
  console.log({ r, s, v });

  return { hashedMessage, v, r, s };
}
