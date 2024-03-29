import { NextResponse } from "next/server";
import init, { keygen } from "../../../../public/rabe/rabe_wasm";
import wasmUrl from "../../../../wasm_config";
import { createClient } from "@/lib/supabase";
import { ethEncrypt } from "@/utils/metamask";
import AttributeTokenContract from "../../../contracts/AttributeToken.json";
import { createPublicClient, http, getContract } from "viem";
import { sepolia } from "viem/chains";
import { attributeTokenSCAddress } from "../../../../sc_config";

export async function POST(request: Request) {
  const { metaMaskAddresss, hashedMessage, v, r, s, ethPk } =
    await request.json();

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(
      `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY || ""}`
    ),
  });

  const attributes = (await publicClient.readContract({
    address: attributeTokenSCAddress,
    abi: AttributeTokenContract.abi,
    functionName: "generateAttributeList",
    args: [metaMaskAddresss, hashedMessage, v, r, s],
  })) as number[];

  const attributeNumber: string[] = attributes.map((attr: number) => {
    return `${Number(attr)}`;
  });

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
      const sk = keygen(pk["key"], msk["key"], JSON.stringify(attributeNumber)); // pk_json: string, msk_json: string, pol_json: string
      const encryptedSk = ethEncrypt(ethPk, sk);
      return NextResponse.json({ encryptedSk });
    }
  });
}
