"use client";

import { useStorageUpload } from "@/lib/thirdweb-dev";
import { useState } from "react";

export default function DataForm() {
  const [text, setText] = useState("");
  const { mutateAsync: upload, isLoading } = useStorageUpload();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const uris = await upload({ data: [text] });
    console.log(uris);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
