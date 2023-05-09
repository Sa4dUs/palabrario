import type { NextApiRequest, NextApiResponse } from 'next';
import calculateScore from '@/lib/calculateScore';

interface GuessRequestBody {
  guess: string;
  secret: string;
}

interface GuessResponseBody {
  score: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<GuessResponseBody | string>) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { guess, secret } = req.body as GuessRequestBody;

  if (!guess || guess.trim().length === 0 || !secret || secret.trim().length === 0) {
    res.status(400).send('Bad Request: "guess" is required');
    return;
  }

  let score = calculateScore(guess, secret);

  const responseBody: GuessResponseBody = { score };

  res.status(200).json(responseBody);
}
