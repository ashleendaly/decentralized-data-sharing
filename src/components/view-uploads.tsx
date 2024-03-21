"use client";

import IPFSUploader from "../contracts/IPFSUploader.json";
import { Input } from "./ui/input";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import { EthersContext } from "@/contexts/ethers";

const ViewUploads = () => {
  const [lookupAddress, setLookupAddress] = useState("");
  const [transactionResponse, setTransactionResponse] = useState([]);
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
      const parsedTransaction = transaction[1].map(
        (key: string, index: number) => {
          return { ipfshash: [key], policy: transaction[0][index] };
        }
      );
      setTransactionResponse(parsedTransaction);
    } catch (error) {
      console.error("Error minting new tokens:", error);
    }
  };

  return (
    <div className="flex flex-col w-1/2 md:w-3/4 gap-5">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <Input
            placeholder="Lookup an address..."
            value={lookupAddress}
            onChange={(event) => setLookupAddress(event.target.value)}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <div className="flex flex-col gap-2">
        {transactionResponse &&
          transactionResponse.map(
            (transaction: { ipfshash: string; policy: string }) => {
              return (
                <div
                  key={transaction.ipfshash}
                  className="flex flex-col border rounded p-2"
                >
                  <div className="flex gap-1">
                    <div className="font-bold">IPFS URI:</div>
                    <div>{transaction.ipfshash}</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-bold">Access Policy:</div>
                    <div>{transaction.policy}</div>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default ViewUploads;
