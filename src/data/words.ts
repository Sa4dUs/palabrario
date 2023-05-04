import fs from "fs"
import path from "path"

export const WORDS = fs.readFileSync(path.resolve(__dirname, '../../../../src/data/dict.txt')).toString().split('\n');

export const SECRET_WORD = WORDS[Math.floor(Math.random()*WORDS.length)];