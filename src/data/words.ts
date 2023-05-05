import { initialize } from '@paunovic/random-words'

const getRandomWord = () => {
    const RANDOM = initialize({ countryCode: 'es' })

    return RANDOM.word();
};

export const SECRET_WORD = getRandomWord();
