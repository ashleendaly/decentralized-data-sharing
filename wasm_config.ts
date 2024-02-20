let wasmUrl: string;

if (typeof window === "undefined") {
  wasmUrl = "http://localhost:3000/rabe/rabe_wasm_bg.wasm";
} else {
  wasmUrl = "/rabe/rabe_wasm_bg.wasm";
}

export default wasmUrl;
