import { useEffect, useState } from "react";

import Head from "next/head";
import Victory from "./components/Victory";
import Word from "./components/Word";
import WordList from "./components/WordList";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer";

interface Word {
    text: string;
    score: number;
}

const SecretWordGame: React.FC = () => {
    const [wordlist, setWordlist] = useState<Word[]>([]);
    const [guess, setGuess] = useState<string>("");
    const [lastScore, setLastScore] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const [typeOfGuesses, setTypeOfGuesses] = useState<number[]>([0, 0, 0]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [lastWord, setLastWord] = useState<string>("");
    const [secret, setSecret] = useState<string>("");

    useEffect(() => {
        (async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REDIS_URL}/get/wotd`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setSecret(data.result);
                })
        })()
    },[])

    const handleSubmit = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        setLastWord(guess);
        setIsLoading(true);
        event.preventDefault();
        const response = await fetch("/api/guess", {
            method: "POST",
            body: JSON.stringify({ guess, secret }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { score } = await response.json();
        setLastScore(score);

        if (score != -1 && !wordlist.some((word) => word.text == guess)) {
            let newArray = [...wordlist, { text: guess, score: score }].sort(
                (a, b) => {
                    if (a.score < b.score) {
                        return 1;
                    } else if (a.score > b.score) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            );
            let newTypeOfGuesses;
            let percentage = score * 100;
            if (percentage < 50) {
                newTypeOfGuesses = [
                    typeOfGuesses[0] + 1,
                    typeOfGuesses[1],
                    typeOfGuesses[2],
                ];
            } else if (percentage < 75) {
                newTypeOfGuesses = [
                    typeOfGuesses[0],
                    typeOfGuesses[1] + 1,
                    typeOfGuesses[2],
                ];
            } else {
                newTypeOfGuesses = [
                    typeOfGuesses[0],
                    typeOfGuesses[1],
                    typeOfGuesses[2] + 1,
                ];
            }

            setTypeOfGuesses(newTypeOfGuesses);
            setCounter(counter + 1);

            setWordlist(newArray);
        }

        setIsLoading(false);
        setGuess("");
    };

    return (
        <>
        <Head>
            <title>Palabrario</title>
        </Head>
        <div
            className="h-screen
            flex flex-col items-center justify-start bg-gray-900 text-white font-sans"
        >
            {lastScore === 1 && (
                <Victory word={wordlist[0].text.toUpperCase()} counter={counter} typeOfGuesses={typeOfGuesses}/>
            )}
            {lastScore !== 1 && (
                <div className="flex flex-col flex-grow items-center justify-start">
                    <h1 className="text-5xl font-bold mt-8 mb-16 text-white">
                        PALABRARIO
                    </h1>
                    <form
                        onSubmit={(event) => event.preventDefault()}
                        className="flex flex-col items-center"
                    >
                        <label
                            htmlFor="guess"
                            className="mb-4 text-sm font-semibold self-start"
                        >
                            INTENTOS:{" "}
                            <span className="text-xl font-bold">{counter}</span>
                        </label>
                        <input
                            id="guess"
                            type="text"
                            value={guess}
                            placeholder="escribe una palabra"
                            onChange={(event) =>
                                setGuess(event.target.value.toLowerCase())
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSubmit(event);
                                }
                            }}
                            className="p-4 border border-gray-300 rounded-md mb-4 text-white bg-slate-800 w-80"
                        />
                    </form>
                    {lastScore === -1 && (
                        <p className="text-white text-base font-semibold mt-4 mb-8">
                            Esta palabra no es válida
                        </p>
                    )}
                    {(lastScore !== -1 && wordlist.length !== 0 || isLoading) &&
                        (!isLoading ? (
                            <>
                                <WordList wordlist={[{text:lastWord,score:lastScore}]}/>
                                <hr className="mb-4 w-full h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />{" "}
                            </>
                        ) : (
                            <>
                                <Spinner/>
                                <hr className="mb-4 w-full h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />{" "}
                            </>
                        ))}
                    <WordList wordlist={wordlist}/>
                </div>
            )}
            <Footer/>
        </div>
        </>
    );
};

export default SecretWordGame;
