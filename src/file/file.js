import * as fs from "fs";
import * as readline from "readline";

/**
 * @param {string} filePath
 * @param {import("../types").SelectionRange} [range]
    * @returns { Promise<string> }
 */
export async function readFileRange(filePath, range) {
    if (!range) {
        range = { start: 0, end: fs.statSync(filePath).size };
    }

    return await readStream(filePath, range);
}
// TODO: Generator instead of promise?

/**
 * @param {fs.PathLike} filePath
 * @param {import("../types").SelectionRange} range
 */
async function readStream(filePath, range) {
    return new Promise(resolve => {
        let bufferedStream = "";

        const stream = fs.createReadStream(filePath, { start: range.start, end: range.end });
        stream.on("data", chunk => {
            bufferedStream += chunk.toString();
        })
        stream.on("close", () => resolve(bufferedStream));
    });
}

/**
 * @param {string} filePath
 * @param {number} lineIndex
 */
export function readFileLine(filePath, lineIndex) {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath)
        });

        let index = 1;
        rl.on("line", line => {
            if (index === lineIndex) {
                resolve(line);
            }
            index++;
        });
    })
}
