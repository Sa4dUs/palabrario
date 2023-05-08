import natural from "natural";

import { SECRET_WORD } from "@/data/words";

function calculateScore(guess: string): number {
    console.log("[calculateScore.ts] ", SECRET_WORD);
    if (guess.split(" ").length > 1) {
        return -1;
    }

    let len = Math.max(guess.length, SECRET_WORD.length);

    const distance =
        (len - natural.LevenshteinDistance(guess, SECRET_WORD, {})) / len;
    return distance;
}

export default calculateScore;
