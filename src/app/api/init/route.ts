import { NextResponse } from 'next/server';

let keys = {};

export async function POST(request: Request) {
  const { pk, msk } = await request.json();

  if (Object.keys(keys).length !== 0) {
    return NextResponse.json({ message: 'Keys already set' });
  }

  keys = { pk, msk };

  return NextResponse.json({ message: 'Keys stored successfully' });
}

export async function GET(request: Request) {
  return NextResponse.json(keys);
}
