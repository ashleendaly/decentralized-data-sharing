"use client";

import { useStorageUpload } from "@/lib/thirdweb-dev";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PolicyStringFormProps {
  dataToUpload: { [key: string]: string };
}

export default function PolicyStringForm({
  dataToUpload,
}: PolicyStringFormProps) {
  const [policyString, setPolicyString] = useState<string>("");
  const { mutateAsync: upload } = useStorageUpload();
  console.log(dataToUpload);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // const uris = await upload({ data: [dataToUploadToIpfs] });
    // console.log(uris);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/3">
      <div className="flex items-center">
        <Input
          placeholder="Write policy string..."
          value={policyString}
          onChange={(event) => setPolicyString(event.target.value)}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
