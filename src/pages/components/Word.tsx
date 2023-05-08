interface PropType {
    percentage: number;
    text: string;
}

const getColor = (percentage: number): string => {
    let color;
    if (percentage < 50) {
        color = "bg-red-400";
    } else if (percentage < 75) {
        color = "bg-yellow-400";
    } else {
        color = "bg-green-400";
    }
    return color;
};

const Word = ({ percentage, text }: PropType) => {
    return (
        <li className="w-full mb-4">
            <div
                className="h-8 relative rounded-md border-4 overflow-hidden py-5"
                style={{ maxWidth: "400px" }}
            >
                <div
                    className={`absolute top-0 left-0 h-full w-full ${getColor(
                        percentage
                    )}`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
                <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full pr-4 pl-4">
                    <p className="text-md font-semibold">
                        {text}
                    </p>
                    <p className="ml-2 text-sm font-medium">
                        {percentage.toFixed(2)}%
                    </p>
                </div>
            </div>
        </li>
    );
};

export default Word;
