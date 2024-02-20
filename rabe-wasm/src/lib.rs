extern crate rabe;
use crate::rabe::schemes::*;
use rabe::schemes::bsw::{CpAbeCiphertext,CpAbePublicKey };
use rabe::utils::policy::pest::PolicyLanguage;
use wasm_bindgen::prelude::*;
use serde_json; 

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn setup() -> Result<JsValue, JsValue> {
    let (pk, msk) = bsw::setup();

    let pk_json = serde_json::to_string(&pk).unwrap_or_else(|_| "Failed to serialize pk".to_string());
    let msk_json = serde_json::to_string(&msk).unwrap_or_else(|_| "Failed to serialize msk".to_string());

    let result = (pk_json, msk_json);

    serde_wasm_bindgen::to_value(&result)
        .map_err(|e| e.into())
}

#[wasm_bindgen]
pub fn encrypt(pk_json: &str, policy: &str, plaintext: Vec<u8>) -> Result<String, JsValue> {
    let pk: CpAbePublicKey = serde_json::from_str(pk_json)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let policy_string = policy.to_string();
    
    let ct_cp: CpAbeCiphertext = bsw::encrypt(&pk, &policy_string, &plaintext, PolicyLanguage::HumanPolicy)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    
    serde_json::to_string(&ct_cp)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn keygen(pk_json: &str, msk_json: &str, pol_json: &str) -> Result<String, JsValue> {
    let pk: CpAbePublicKey = serde_json::from_str(pk_json)
        .map_err(|e| JsValue::from_str(&format!("Error deserializing pk: {}", e)))?;

    let msk: CpAbeMasterKey = serde_json::from_str(msk_json)
        .map_err(|e| JsValue::from_str(&format!("Error deserializing msk: {}", e)))?;

    let pol_vec: Vec<String> = serde_json::from_str(pol_json)
        .map_err(|e| JsValue::from_str(&format!("Error deserializing policy vector: {}", e)))?;

    let sk: CpAbeSecretKey = bsw::keygen(&pk, &msk, &pol_vec)
        .ok_or_else(|| JsValue::from_str("Key generation failed: SecretKey not generated"))?;

    serde_json::to_string(&sk)
        .map_err(|e| JsValue::from_str(&format!("Error serializing secret key: {}", e)))
}


#[wasm_bindgen]
pub fn decrypt(sk_json: &str, ct_cp_json: &str) -> Result<Uint8Array, JsValue> {
    let sk: CpAbeSecretKey = serde_json::from_str(sk_json)
        .map_err(|e| JsValue::from_str(&format!("Error deserializing secret key: {}", e)))?;

    let ct_cp: CpAbeCiphertext = serde_json::from_str(ct_cp_json)
        .map_err(|e| JsValue::from_str(&format!("Error deserializing ciphertext: {}", e)))?;

    let plaintext_bytes = bsw::decrypt(&sk, &ct_cp)
        .map_err(|e| JsValue::from_str(&format!("Decryption error: {}", e)))?;

    Ok(Uint8Array::new_with_length(plaintext_bytes.len() as u32).fill_with(&Clamped(&plaintext_bytes)))
}