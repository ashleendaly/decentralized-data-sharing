export async function generateEncryptedSecretKey(
  attributes: string[],
  ethPk: Buffer
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
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
