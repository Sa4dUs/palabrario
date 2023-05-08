import { useRouter } from "next/router";
import ShareButton from "./ShareButton";

interface PropType {
    word: string,
    counter: number,
    typeOfGuesses: number[]
}

function Victory ({word, counter, typeOfGuesses}: PropType) {
    const router = useRouter()

    return (<div className="flex flex-col items-center justify-center h-full">
    <div className="flex flex-col items-center justify-center p-4 rounded-md bg-slate-800">
        <h1 className="text-5xl font-bold text-green-500 my-4">
            ¡HAS GANADO!
        </h1>
        <p>
            ¡Has adivinado la palabra
            <b> {word} </b>
            en <b> {counter} </b>
            intentos!
        </p>
        <p>🟩{typeOfGuesses[2]}</p>
        <p>🟨{typeOfGuesses[1]}</p>
        <p>🟥{typeOfGuesses[0]}</p>
        <ShareButton
            text={`!He adivinado la palabra jugando a ${process.env.NEXT_PUBLIC_BASE_URL}!\n🟩${typeOfGuesses[2]}\n🟨${typeOfGuesses[1]}\n🟥${typeOfGuesses[0]}`}
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
</div>)
}

export default Victory