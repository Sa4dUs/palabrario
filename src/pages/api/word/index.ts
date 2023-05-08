import randomWords from "random-spanish-words";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string[];
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    fetch(`${process.env.NEXT_PUBLIC_REDIS_URL}/set/wotd/${randomWords()}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return res.status(200);
        });
}
