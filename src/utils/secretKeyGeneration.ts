export async function generateEncryptedSecretKey(
  attributeList: string[],
  ethPk: Buffer
) {
  const res = await fetch(`/api/keygen`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pol_json: JSON.stringify(attributeList),
      ethPk: ethPk,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
