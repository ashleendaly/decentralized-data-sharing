'use client';
import React, { useState, useEffect } from 'react';
import { EthEncryptedData, encrypt } from '@metamask/eth-sig-util';
const ascii85 = require('ascii85');

const Page = () => {
  const account = '0x6c2127ced02a0d9a3dc29a8be472ecc72ef7862d';

  function encryptData(publicKey: Buffer, data: Buffer): Buffer {
    const enc = encrypt({
      publicKey: publicKey.toString('base64'),
      data: ascii85.encode(data).toString(),
      version: 'x25519-xsalsa20-poly1305',
    });

    const buf = Buffer.concat([
      Buffer.from(enc.ephemPublicKey, 'base64'),
      Buffer.from(enc.nonce, 'base64'),
      Buffer.from(enc.ciphertext, 'base64'),
    ]);

    return buf;
  }

  async function decryptData(account: string, data: Buffer): Promise<Buffer> {
    const structuredData = {
      version: 'x25519-xsalsa20-poly1305',
      ephemPublicKey: data.slice(0, 32).toString('base64'),
      nonce: data.slice(32, 56).toString('base64'),
      ciphertext: data.slice(56).toString('base64'),
    };

    const ct = `0x${Buffer.from(
      JSON.stringify(structuredData),
      'utf8'
    ).toString('hex')}`;

    const decrypt = await window.ethereum.request({
      method: 'eth_decrypt',
      params: [ct, account],
    });

    return ascii85.decode(decrypt);
  }

  useEffect(() => {
    const performAsyncOperations = async () => {
      const keyB64 = (await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [account],
      })) as string;
      const publicKey = Buffer.from(keyB64, 'base64');
      const pt = Buffer.from('encrypt me using metamask');
      const ct = encryptData(publicKey, pt);
      const dycrypted_ct = await decryptData(account, ct);
      console.log(dycrypted_ct.toString());
    };

    performAsyncOperations().catch(console.error);
  }, []);

  return <div></div>;
};

export default Page;
