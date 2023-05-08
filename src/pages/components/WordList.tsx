import Word from "./Word";

interface WordType {
    text: string;
    score: number;
}

interface PropType {
    wordlist: WordType[];
}



function WordList({ wordlist = [] }: PropType) {
    return (
        <ul className="flex flex-col items-center w-80">
            {wordlist.length !== 0 &&
                wordlist.map(({ text, score }, index) => {
                    const percentage = score * 100;

                    return (
                        <Word key={index} percentage={percentage} text={text} />
                    );
                })}
        </ul>
    );
}

export default WordList;
