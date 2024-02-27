import RequestData from '@/components/request-data';

async function getData() {
  const res = await fetch(`${process.env.APPLICATION_DOMAIN}/api/keygen`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['1']),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default async function Request() {
  const sk = await getData();
  const sk_json = sk['sk'];
  return (
    <div>
      <RequestData sk_json={sk_json} />
    </div>
  );
}
