let SECRET_WORD = "";

const getSecretWord = () => {
    fetch(`${process.env.NEXT_PUBLIC_REDIS_URL}/get/wotd`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDIS_TOKEN}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            SECRET_WORD = data.result;
        });
};

getSecretWord();

export { SECRET_WORD };
