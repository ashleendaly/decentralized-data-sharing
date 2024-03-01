/* tslint:disable */
/* eslint-disable */
/**
* @returns {any}
*/
export function setup(): any;
/**
* @param {string} pk_json
* @param {string} policy
* @param {Uint8Array} plaintext
* @returns {string}
*/
export function encrypt(pk_json: string, policy: string, plaintext: Uint8Array): string;
/**
* @param {string} pk_json
* @param {string} msk_json
* @param {string} pol_json
* @returns {string}
*/
export function keygen(pk_json: string, msk_json: string, pol_json: string): string;
/**
* @param {string} sk_json
* @param {string} ct_cp_json
* @returns {Uint8Array}
*/
export function decrypt(sk_json: string, ct_cp_json: string): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly setup: (a: number) => void;
  readonly encrypt: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly keygen: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly decrypt: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
