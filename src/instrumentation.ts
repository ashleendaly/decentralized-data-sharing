import init, { setup } from "../public/rabe/rabe_wasm";
import wasmUrl from "../wasm_config";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("test");
    if (!process.env["MSK"]) {
      return await init(wasmUrl).then(() => {
        const result = setup();
        process.env["PK"] = JSON.parse(result[0]);
        process.env["MSK"] = JSON.parse(result[1]);
      });
    }
  }
}
