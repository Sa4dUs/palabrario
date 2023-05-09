import { useRouter } from "next/router";
import ShareButton from "./ShareButton";

interface PropType {
    id: number;
    counter: number;
    typeOfGuesses: number[];
}

function Victory({ id, counter, typeOfGuesses = [0, 0, 0] }: PropType) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center p-4 rounded-md bg-slate-800">
                <h1 className="text-2xl font-bold text-white my-4">
                    Felicidades!
                </h1>
                <p className="font-semibold">
                    Has adivinado la palabra{" "}
                    <span className="font-bold">{`#${id}`} </span>
                    en <span className="font-bold"> {counter} </span>
                    intentos
                </p>
                <p>🟩{typeOfGuesses[2]}</p>
                <p>🟨{typeOfGuesses[1]}</p>
                <p>🟥{typeOfGuesses[0]}</p>
                <ShareButton
                    text={
                        counter === 1
                            ? `¡He adivinado la palabra #${id} a la primera en ${process.env.NEXT_PUBLIC_BASE_URL}!\n🟩${typeOfGuesses[2]}\n🟨${typeOfGuesses[1]}\n🟥${typeOfGuesses[0]}`
                            : `¡He adivinado la palabra #${id} jugando a ${process.env.NEXT_PUBLIC_BASE_URL}!\n🟩${typeOfGuesses[2]}\n🟨${typeOfGuesses[1]}\n🟥${typeOfGuesses[0]}`
                    }
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
    );
}

export default Victory;
