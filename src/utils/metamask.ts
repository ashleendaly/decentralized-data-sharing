import { encrypt, EthEncryptedData } from "@metamask/eth-sig-util";
const ascii85 = require("ascii85");

export function ethEncrypt(publicKey: Buffer, data: Buffer): EthEncryptedData {
  const enc = encrypt({
    publicKey: publicKey.toString("base64"),
    data: ascii85.encode(data).toString(),
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
  return ascii85.decode(decrypt).toString();
}
