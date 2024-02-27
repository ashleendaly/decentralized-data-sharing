import { NextResponse } from 'next/server';
import init, { keygen } from '../../../../public/rabe/rabe_wasm';
import wasmUrl from '../../../../wasm_config';

export async function POST(request: Request) {
  const data = await request.json();
  const pol_json = JSON.stringify(data);

  const response = await fetch(`${process.env.APPLICATION_DOMAIN}/api/init`);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const { pk, msk } = await response.json();

  console.log(pk);
  console.log(msk);

  return await init(wasmUrl).then(() => {
    const result = keygen(pk, msk, pol_json); // pk_json: string, msk_json: string, pol_json: string
    const sk = result;
    return NextResponse.json({ sk });
  });
}
