"use client";

import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Input } from "./ui/input";
import { useState } from "react";

const ViewUploads = () => {
  const [lookupAddress, setLookupAddress] = useState("");
  const { contract } = useContract(
    "0xe4f1D0F6529F7583AbBf97d2FB0400b49a887CaC"
  );
  const { data } = useContractRead(contract, "uploads", [lookupAddress]);

  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col w-1/3 gap-5">
        <div className="flex items-center">
          <Input
            placeholder="Lookup an address..."
            value={lookupAddress}
            onChange={(event) => setLookupAddress(event.target.value)}
          />
        </div>
      </form>
      {data && (
        <div className="flex flex-col">
          <div>{data[1]}</div>
          <div>{data[2]}</div>
        </div>
      )}
    </div>
  );
};

export default ViewUploads;
