"use client";

import { useStorageUpload } from "@thirdweb-dev/react";
import init, { encrypt } from "../../public/rabe/rabe_wasm";
import { ChangeEvent, useContext, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash, Plus } from "lucide-react";
import wasmUrl from "../../wasm_config";
import { ethers } from "ethers";
import { EthersContext } from "@/contexts/ethers";
import IPFSUploader from "../contracts/IPFSUploader.json";

interface ipfsData {
  [key: string]: string;
}

interface DataFormProps {
  pk: string;
}

export default function UploadForm({ pk }: DataFormProps) {
  const { signer, metaMaskAddresss } = useContext(EthersContext);
  const [newProperty, setNewProperty] = useState<string>("");
  const [dataToUploadToIpfs, setDataToUploadToIpfs] = useState<ipfsData>({});
  const [policyString, setPolicyString] = useState<string>("");
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToSmartContract = async (
    ipfsHash: string,
    policyString: string
  ) => {
    const contract = new ethers.Contract(
      "0xF7e95a6ee85AdeDBCCaF1Ee3c5b272b0971aE6E4",
      IPFSUploader.abi,
      signer
    );
    try {
      const transaction = await contract.upload(ipfsHash, policyString);
      await transaction.wait();
      console.log("Transaction successful:", transaction);
    } catch (error) {
      console.error("Error minting new tokens:", error);
    }
  };

  const handleAddNewProperty = (property: string) => {
    if (property != "") {
      const propertyCapitalised = property[0].toUpperCase() + property.slice(1);
      setDataToUploadToIpfs((prev) => ({
        ...prev,
        [propertyCapitalised]: "",
      }));
      setNewProperty("");
    }
  };

  const handleUpdateProperty = (property: string, data: string) => {
    setDataToUploadToIpfs((prev) => ({
      ...prev,
      [property]: data,
    }));
  };

  const handleDeleteProperty = (property: string) => {
    setDataToUploadToIpfs((prev) => {
      const { [property]: deletedType, ...rest } = prev;
      return rest;
    });
  };

  const handleEncrypt = async (
    pk: string,
    policyString: string,
    plaintextString: string
  ) => {
    return init(wasmUrl).then(() => {
      const plaintext = new TextEncoder().encode(plaintextString);
      const result = encrypt(pk, policyString, plaintext);
      return result;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const dataToUploadString = JSON.stringify(dataToUploadToIpfs);
    const ciphertext = await handleEncrypt(
      pk,
      policyString,
      dataToUploadString
    );
    const uris = await upload({ data: [ciphertext] });
    await uploadToSmartContract(uris[0], policyString);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-5">
      <div className="flex items-center">
        <Input
          placeholder="Add property..."
          value={newProperty}
          onChange={(event) => setNewProperty(event.target.value)}
        />
        <Button type="button" onClick={() => handleAddNewProperty(newProperty)}>
          <Plus size={16} />
        </Button>
      </div>
      {Object.keys(dataToUploadToIpfs).map((key) => {
        return (
          <div key={key} className="flex gap-1 items-center">
            <p>{key}: </p>
            <Input
              value={dataToUploadToIpfs[key]}
              onChange={(event) =>
                handleUpdateProperty(key, event?.target.value)
              }
            />
            <Button type="button" onClick={() => handleDeleteProperty(key)}>
              <Trash size={16} />
            </Button>
          </div>
        );
      })}
      <Input
        placeholder="Write policy string..."
        value={policyString}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPolicyString(event.target.value)
        }
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
