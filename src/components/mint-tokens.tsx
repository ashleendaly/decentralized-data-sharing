"use client";
import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AttributeTokenContract from "../contracts/AttributeToken.json";
import { EthersContext } from "@/contexts/ethers";

export default function MintTokens() {
  const contractAddress = process.env.NEXT_PUBLIC_ATTRIBUTE_ADDRESS;

  const { signer } = useContext(EthersContext);
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);

  if (!signer) return;
  if (!contractAddress) return;

  const mintTokens = async (event: any) => {
    event.preventDefault();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(
      contractAddress,
      AttributeTokenContract.abi,
      signer
    );
    try {
      const transaction = await contract.mintNewToken(address, id, amount);
      await transaction.wait();
      console.log("Transaction successful:", transaction);
    } catch (error) {
      console.error("Error minting new tokens:", error);
    }
  };

  return (
    <form onSubmit={mintTokens} className="flex flex-col w-1/3 gap-5">
      <div className="flex items-center">
        <Input
          placeholder="id..."
          value={id}
          onChange={(e) => setId(parseInt(e.target.value))}
        />
        <Input
          placeholder="amount..."
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
