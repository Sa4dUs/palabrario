import randomWords from 'random-spanish-words';
import schedule from 'node-schedule';

let SECRET_WORD = 'hola';

const updateSecretWord = () => {
  SECRET_WORD = randomWords();
  console.log(`New secret word set: ${SECRET_WORD}`);
}

// Schedule the update to happen every day at 00:00
schedule.scheduleJob('0 0 * * *', updateSecretWord);

export { SECRET_WORD };
