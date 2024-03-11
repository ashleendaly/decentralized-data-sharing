export async function generateEncryptedSecretKey(
  attributes: string[],
  ethPk: string
) {
  const res = await fetch(`/api/generatekey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attributes: attributes,
      ethPk: ethPk,
    }),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage = errorBody.message || "Unknown error";
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }
  return res.json();
}
