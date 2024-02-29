"use client";

import {
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@/lib/thirdweb-dev";
import init, { encrypt } from "../../public/rabe/rabe_wasm";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash, Plus } from "lucide-react";
import wasmUrl from "../../wasm_config";

interface ipfsData {
  [key: string]: string;
}

export default function DataForm() {
  const [newProperty, setNewProperty] = useState<string>("");
  const [dataToUploadToIpfs, setDataToUploadToIpfs] = useState<ipfsData>({});
  const [policyString, setPolicyString] = useState<string>("");
  const [pk, setPk] = useState<string>("");
  const { mutateAsync: upload } = useStorageUpload();

  const { contract } = useContract(
    "0xe4f1D0F6529F7583AbBf97d2FB0400b49a887CaC"
  );

  const { mutateAsync: uploadSmartContract } = useContractWrite(
    contract,
    "upload"
  );

  const uploadToSmartContract = async (
    ipfsHash: string,
    policyString: string
  ) => {
    try {
      const data = await uploadSmartContract({
        args: [ipfsHash, policyString],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
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
    console.log(policyString);
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
        onChange={(event) => setPolicyString(event.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
