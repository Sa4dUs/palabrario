import randomWords from "random-spanish-words";

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET' || req.method === 'POST') {
    console.log(req.method);
    try {
        fetch(
            `${process.env.NEXT_PUBLIC_REDIS_URL}/set/wotd/${randomWords()}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
                },
            }
        );

        res.send("OK");
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
}
}
