import natural from "natural";

function calculateScore (guess: string, secret: string): number {
    if (guess.split(" ").length > 1) {
        return -1;
    }

    let len = Math.max(guess.length, secret.length);

    const distance =
        (len - natural.LevenshteinDistance(guess, secret, {})) / len;
    return distance;
}

export default calculateScore;
