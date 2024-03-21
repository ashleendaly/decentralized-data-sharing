"use client";
import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AttributeTokenContract from "../contracts/AttributeToken.json";
import { EthersContext } from "@/contexts/ethers";
import { Label } from "./ui/label";

export default function TransferTokens() {
  const contractAddress = process.env.NEXT_PUBLIC_ATTRIBUTE_ADDRESS;

  const { signer, metaMaskAddresss } = useContext(EthersContext);
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");

  if (!signer) return;
  if (!contractAddress) return;

  const mintTokens = async (event: any) => {
    event.preventDefault();
    const contract = new ethers.Contract(
      contractAddress,
      AttributeTokenContract.abi,
      signer
    );
    try {
      const transaction = await contract.safeTransferFrom(
        metaMaskAddresss,
        receiver,
        id,
        amount,
        "0x00"
      );
      await transaction.wait();
      console.log("Transaction successful:", transaction);
    } catch (error) {
      console.error("Error minting new tokens:", error);
    }
  };

  return (
    <form onSubmit={mintTokens} className="flex flex-col w-1/2 md:w-3/4 gap-3">
      <div className="flex items-center gap-2">
        <Label>TokenID</Label>
        <Input
          placeholder="id..."
          value={id}
          onChange={(e) => setId(parseInt(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label>MintAmount</Label>
        <Input
          placeholder="amount..."
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label>RecieverAddress</Label>
        <Input
          placeholder="receiver..."
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
