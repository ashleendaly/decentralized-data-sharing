import { NextResponse } from "next/server";
import init, { keygen } from "../../../../public/rabe/rabe_wasm";
import wasmUrl from "../../../../wasm_config";
import { z } from "zod";
import { createClient } from "@/lib/supabase";
import { ethEncrypt } from "@/utils/metamask";

const keygenSchema = z.object({
  pol_json: z.string(),
  ethPk: z.instanceof(Buffer),
});

export async function POST(request: Request) {
  const req = await request.json();
  const { pol_json, ethPk } = keygenSchema.parse(req);

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
      const result = keygen(pk["key"], msk["key"], pol_json); // pk_json: string, msk_json: string, pol_json: string
      const sk = Buffer.from(result);
      const encryptedSk = ethEncrypt(ethPk, sk);
      return NextResponse.json({ encryptedSk });
    }
  });
}
