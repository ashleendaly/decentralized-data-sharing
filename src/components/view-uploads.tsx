"use client";

import IPFSUploader from "../contracts/IPFSUploader.json";
import { Input } from "./ui/input";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import { EthersContext } from "@/contexts/ethers";

const ViewUploads = () => {
  const [lookupAddress, setLookupAddress] = useState("");
  const { signer } = useContext(EthersContext);
  const contractAddress = process.env.NEXT_PUBLIC_IPFSUPLOADER_ADDRESS || "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const contract = new ethers.Contract(
      contractAddress,
      IPFSUploader.abi,
      signer
    );
    try {
      const transaction = await contract.getAllUploadsForAddress(lookupAddress);
      console.log("Transaction successful:", transaction);
    } catch (error) {
      console.error("Error minting new tokens:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-3">
      <div className="flex items-center">
        <Input
          placeholder="Lookup an address..."
          value={lookupAddress}
          onChange={(event) => setLookupAddress(event.target.value)}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default ViewUploads;
