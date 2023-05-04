import { useState } from "react";
import { useRouter } from "next/router";
import ShareButton from "./components/ShareButton";

interface Word {
    text: string;
    score: number;
}

const SecretWordGame: React.FC = () => {
    const router = useRouter();

    const [wordlist, setWordlist] = useState<Word[]>([]);
    const [guess, setGuess] = useState<string>("");
    const [lastScore, setLastScore] = useState<number>();
    const [counter, setCounter] = useState<number>(0);
    const [typeOfGuesses, setTypeOfGuesses] = useState<number[]>([0, 0, 0]);

    const handleSubmit = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        const response = await fetch("/api/guess", {
            method: "POST",
            body: JSON.stringify({ guess }),
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

        setGuess("");
    };

    return (
        <div
            className="h-screen
            flex flex-col items-center justify-start bg-gray-900 text-white font-sans"
        >
            {lastScore === 1 && (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center justify-center p-4 rounded-md bg-slate-800">
                    <h1 className="text-5xl font-bold text-green-500 my-4">
                        ¡HAS GANADO!
                    </h1>
                    <p>
                        ¡Has adivinado la palabra
                        <b> {wordlist[0].text.toUpperCase()} </b>
                        en <b> {counter} </b>
                        intentos!
                    </p>
                    <p>🟩{typeOfGuesses[2]}</p>
                    <p>🟨{typeOfGuesses[1]}</p>
                    <p>🟥{typeOfGuesses[0]}</p>
                    <ShareButton
                        text={`!He adivinado la palabra jugando a ${process.env.NEXT_PUBLIC_BASE_URL}!
                    🟩${typeOfGuesses[2]}
                    🟨${typeOfGuesses[1]}
                    🟥${typeOfGuesses[0]}`}
                    />
                    </div>
                    <button
                        className="mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-4 w-60 font-semibold rounded-md"
                        onClick={() => {
                            router.reload();
                        }}
                    >
                        Volver a jugar
                    </button>
                </div>
            )}
            {lastScore !== 1 && (
                <div className="flex flex-col items-center justify-start">
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
                            onChange={(event) => setGuess(event.target.value)}
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
                    <ul className="flex flex-col items-center w-80">
                        {wordlist.length !== 0 &&
                            wordlist.map(({ text, score }, index) => {
                                console.log("[index.tsx] ", text, score);
                                const percentage = score * 100;
                                let color;
                                if (percentage < 50) {
                                    color = "bg-red-400";
                                } else if (percentage < 75) {
                                    color = "bg-yellow-400";
                                } else {
                                    color = "bg-green-400";
                                }

                                return (
                                    <li key={index} className="w-full mb-4">
                                        <div
                                            className="h-8 relative rounded-md border-4 overflow-hidden py-5"
                                            style={{ maxWidth: "400px" }}
                                        >
                                            <div
                                                className={`absolute top-0 left-0 h-full w-full ${color}`}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                            <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full pr-4 pl-4">
                                                <p className="text-md font-semibold">
                                                    {text.toLowerCase()}
                                                </p>
                                                <p className="ml-2 text-sm font-medium">
                                                    {percentage.toFixed(2)}%
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SecretWordGame;
