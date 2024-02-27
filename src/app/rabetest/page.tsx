'use client';
import React, { useState, useEffect } from 'react';
import init, {
  decrypt,
  setup,
  encrypt,
  keygen,
} from '../../../public/rabe/rabe_wasm';
import wasmUrl from '../../../wasm_config';

const Page = () => {
  // Initialize state here
  const [testResult, setTestResult] = useState('');

  useEffect(() => {
    const performAsyncOperations = async () => {
      await init(wasmUrl);

      const result = setup();
      const pk = result[0];
      console.log('pk', pk);
      const msk = result[1];
      console.log('msk', msk);

      const pt = new TextEncoder().encode('encrypt me');

      const ciphertext = encrypt(pk, '"A"', pt);
      console.log('ciphertext', ciphertext);

      const sk = keygen(pk, msk, JSON.stringify(['A']));
      console.log('sk', sk);
      const decryptedText = decrypt(sk, ciphertext);
      const newpt = new TextDecoder().decode(decryptedText);

      console.log(newpt);
    };

    performAsyncOperations().catch(console.error);
  }, []);

  return (
    <div>{testResult ? `Decrypted Text: ${testResult}` : 'Loading...'}</div>
  );
};

export default Page;

// fetch(`/api/init`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ pk, msk }),
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data.message))
//   .catch((error) => console.error('Error:', error));
