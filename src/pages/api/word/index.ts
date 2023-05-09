import randomWords from "random-spanish-words";

import type { NextApiRequest, NextApiResponse } from "next";

async function updateData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REDIS_URL}/set/wotd/${randomWords()}`,
    {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
        },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await updateData();

    res.send('OK');
}
