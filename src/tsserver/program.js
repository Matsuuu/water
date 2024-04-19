import ts from "typescript";

/** @type { Map<string, ts.Program> } */
const PROGRAM_CACHE = new Map();

/** @type { import("typescript").CompilerOptions } */
const TS_OPTIONS = {
    // TODO

}

/**
 * @param {string} projectRoot
 * @param {string[]} fileNames
 */
export function getProgramForProject(projectRoot, fileNames) {
    if (PROGRAM_CACHE.has(projectRoot)) {
        return PROGRAM_CACHE.get(projectRoot);
    }

    const program = ts.createProgram(fileNames, TS_OPTIONS)
    PROGRAM_CACHE.set(projectRoot, program);

    return program;
}
