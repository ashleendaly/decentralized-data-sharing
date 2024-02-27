'use client';

import { useStorage } from '@thirdweb-dev/react';
import init, { decrypt } from '../../public/rabe/rabe_wasm';
import wasmUrl from '../../wasm_config';
import { useState } from 'react';

interface RequestDataProps {
  sk_json: string;
}

const RequestData = ({ sk_json }: RequestDataProps) => {
  const [ipfsUri, setIpfsUri] = useState('');
  const storage = useStorage();

  const handleDecrypt = async () => {
    const ipfsDownload = await storage?.download(ipfsUri);
    if (!ipfsDownload) return;
    const result = await fetch(ipfsDownload.url);
    const ct_cp = await result.json();
    const ct_cp_json = JSON.stringify(ct_cp);

    return await init(wasmUrl).then(() => {
      console.log(sk_json);
      console.log(ct_cp_json);
      const result = decrypt(sk_json, ct_cp_json);
      console.log(result);
    });
  };

  return (
    <div>
      <input
        value={ipfsUri}
        onChange={(event) => setIpfsUri(event.target.value)}
      ></input>
      <button onClick={handleDecrypt}>Test</button>
    </div>
  );
};

export default RequestData;
