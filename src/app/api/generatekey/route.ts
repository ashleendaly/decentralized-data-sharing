import { NextResponse } from "next/server";
import init, { keygen } from "../../../../public/rabe/rabe_wasm";
import wasmUrl from "../../../../wasm_config";
import { createClient } from "@/lib/supabase";
import { ethEncrypt } from "@/utils/metamask";
import { BigNumber, ethers } from "ethers";
import AttributeTokenContract from "../../../contracts/AttributeToken.json";

export async function POST(request: Request) {
  const req = await request.json();
  const { metaMaskAddresss, hashedMessage, v, r, s, ethPk } = req;
  const attributeTokenAddress = process.env.NEXT_PUBLIC_ATTRIBUTE_ADDRESS || "";
  const infura = process.env.INFURA_API_KEY || "";
  const provider = new ethers.providers.InfuraProvider("sepolia", infura);

  const contract = new ethers.Contract(
    attributeTokenAddress,
    AttributeTokenContract.abi,
    provider
  );

  const attributes = await contract.generateAttributeList(
    metaMaskAddresss,
    hashedMessage,
    v,
    r,
    s
  );
  const attributeNumber: string[] = attributes.map((attr: BigNumber) => {
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
