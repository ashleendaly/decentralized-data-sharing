"use client";
import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import AttributeTokenContract from "../contracts/AttributeToken.json";
import { EthersContext } from "@/contexts/ethers";
import { signMessage } from "@/utils/metamask";
import { Button } from "./ui/button";
import { attributeTokenSCAddress } from "../../sc_config";

export default function MyTokens() {
  const contractAddress = attributeTokenSCAddress;

  const { signer, metaMaskAddresss } = useContext(EthersContext);
  const [attributes, setAttributes] = useState<undefined | []>(undefined);

  if (!signer) return;
  if (!contractAddress) return;

  const seeAttributeList = async (event: any) => {
    event.preventDefault();
    const contract = new ethers.Contract(
      contractAddress,
      AttributeTokenContract.abi,
      signer
    );

    const { hashedMessage, v, r, s } = await signMessage(
      metaMaskAddresss,
      metaMaskAddresss
    );

    const attributeList = await contract.generateAttributeList(
      metaMaskAddresss,
      hashedMessage,
      v,
      r,
      s
    );
    setAttributes(attributeList);
  };

  return (
    <div className="flex flex-col w-1/2 md:w-3/4 gap-3">
      <Button onClick={seeAttributeList}>View Tokens</Button>
      {attributes &&
        attributes.map((attribute) => {
          return (
            <div
              className="p-3 border rounded flex justify-center"
              key={attribute}
            >
              {Number(attribute)}
            </div>
          );
        })}
    </div>
  );
}
