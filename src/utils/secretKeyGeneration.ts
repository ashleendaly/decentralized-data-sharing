export async function generateEncryptedSecretKey(
  metaMaskAddresss: string,
  hashedMessage: string,
  v: number,
  r: number,
  s: string,
  ethPk: string
) {
  const res = await fetch(`/api/generatekey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      metaMaskAddresss,
      hashedMessage,
      v,
      r,
      s,
      ethPk,
    }),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage = errorBody.message || "Unknown error";
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }
  return res.json();
}
