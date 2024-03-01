"use client";

import { useStorage } from "@thirdweb-dev/react";
import init, { decrypt } from "../../../public/rabe/rabe_wasm";
import wasmUrl from "../../../wasm_config";
import { useContext, useEffect, useState } from "react";
import { EthersContext } from "@/contexts/ethers";
import { ethDecrypt } from "@/utils/metamask";

const Page = () => {
  const [ipfsUri, setIpfsUri] = useState<string>("");
  const [mySk, setMySk] = useState<string | undefined>("");
  const [decryptedIpfs, setDecryptedIpfs] = useState("");
  const { address } = useContext(EthersContext);
  const storage = useStorage();

  useEffect(() => {
    const performAsyncOperations = async () => {
      if (address) {
        const keyB64 = (await window.ethereum.request({
          method: "eth_getEncryptionPublicKey",
          params: [address],
        })) as string;
        const data = await getData(["A"], keyB64);
        const encryptedSk = data["encryptedSk"];
        const decryptedSk = await ethDecrypt(address, encryptedSk);
        return decryptedSk;
      }
    };
    performAsyncOperations()
      .then((decryptedSk) => {
        setMySk(decryptedSk);
      })
      .catch(console.error);
  }, [address]);

  const handleDecrypt = async () => {
    if (ipfsUri) {
      const ipfsDownload = await storage?.download(ipfsUri);
      if (!ipfsDownload) return;
      const result = await fetch(ipfsDownload.url);
      const ct = await result.text();
      return await init(wasmUrl).then(() => {
        if (mySk) {
          const result = decrypt(mySk, ct);
          const decryptedIpfs = new TextDecoder().decode(result);
          setDecryptedIpfs(decryptedIpfs);
        }
      });
    }
  };

  return (
    <div>
      <input
        value={ipfsUri}
        onChange={(event) => setIpfsUri(event.target.value)}
      ></input>
      <button onClick={handleDecrypt}>Test</button>
      {decryptedIpfs !== "" && <div>{decryptedIpfs}</div>}
    </div>
  );
};

export default Page;

async function getData(attributeList: string[], ethPk: string) {
  const res = await fetch(`/api/keygen`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pol_json: JSON.stringify(attributeList),
      ethPk: ethPk,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
