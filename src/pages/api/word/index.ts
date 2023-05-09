import randomWords from "random-spanish-words";

import type { NextApiRequest, NextApiResponse } from "next";

async function updateWord() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_REDIS_URL}/set/wotd/${randomWords()}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
}

async function updateId() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REDIS_URL}/get/id`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
        },
    })
        .then((response) => response.json())
        .then(async (data) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_REDIS_URL}/set/id/${(
                    parseInt(data.result) + 1
                ).toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
                    },
                }
            );
        });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await updateWord();
    await updateId();

    res.send("OK");
}
