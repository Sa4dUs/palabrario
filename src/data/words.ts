import fs from "fs"
import path from "path"

export const WORDS = fs.readFileSync(path.resolve(__dirname, process.env.NEXT_PUBLIC_DICT_PATH || "")).toString().split('\n');

export const SECRET_WORD = WORDS[Math.floor(Math.random()*WORDS.length)];