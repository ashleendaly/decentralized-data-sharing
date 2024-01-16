"use client";

import { useStorageUpload } from "@/lib/thirdweb-dev";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash, Plus } from "lucide-react";

interface ipfsData {
  [key: string]: string;
}

export default function DataForm() {
  const [newProperty, setNewProperty] = useState<string>("");
  const [dataToUploadToIpfs, setDataToUploadToIpfs] = useState<ipfsData>({});
  const { mutateAsync: upload, isLoading } = useStorageUpload();

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const uris = await upload({ data: [dataToUploadToIpfs] });
    console.log(uris);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/3">
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
      <Button type="submit">Submit</Button>
    </form>
  );
}
