"use client";

import init, { setup, encrypt } from "../../public/rabe/rabe_wasm";
import wasmUrl from "../../wasm_config";

// eslint-disable-next-line @next/next/no-async-client-component
const ABE = async () => {
  const handleSetup = async () => {
    return await init(wasmUrl).then(() => {
      const result = setup();
      const pk = JSON.parse(result[0]);
      const msk = JSON.parse(result[1]);
      return { pk, msk };
    });
  };

  const handleEncrypt = async (
    pk: string,
    policyString: string,
    plaintextString: string
  ) => {
    init(wasmUrl).then(() => {
      const plaintext = new TextEncoder().encode(plaintextString);
      const result = encrypt(pk, policyString, plaintext);
      const ciphertext = JSON.parse(result)["_ct"];
      console.log(ciphertext);
    });
  };

  const { pk } = await handleSetup();
  await handleEncrypt(JSON.stringify(pk), '("has_token")', "Test2");

  return <div>Test</div>;
};

export default ABE;
