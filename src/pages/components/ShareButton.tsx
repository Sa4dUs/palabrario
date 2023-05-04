import { useState } from "react";
import { FiShare2 } from "react-icons/fi";

function ShareButton({ text }: { text: string }) {
    const [buttonText, setButtonText] = useState("Compartir!");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setButtonText("Copiado!");
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={copyToClipboard}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 my-4 rounded focus:outline-none focus:shadow-outline"
            >
                <FiShare2 className="inline-block mr-2" />
                {buttonText}
            </button>
        </div>
    );
}

export default ShareButton;
