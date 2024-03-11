import { NextResponse } from "next/server";
import init, { keygen } from "../../../../public/rabe/rabe_wasm";
import wasmUrl from "../../../../wasm_config";
import { createClient } from "@/lib/supabase";
import { ethEncrypt } from "@/utils/metamask";

export async function POST(request: Request) {
  const req = await request.json();
  const { attributes, ethPk } = req;

  const client = createClient();
  const { data: keys } = await client.from("keys").select("type,key");
  const pk = keys?.find((key) => {
    return key["type"] == "pk";
  });
  const msk = keys?.find((key) => {
    return key["type"] == "msk";
  });

  return await init(wasmUrl).then(() => {
    if (pk && msk) {
      const sk = keygen(pk["key"], msk["key"], JSON.stringify(attributes)); // pk_json: string, msk_json: string, pol_json: string
      const encryptedSk = ethEncrypt(ethPk, sk);
      return NextResponse.json({ encryptedSk });
    }
  });
}
