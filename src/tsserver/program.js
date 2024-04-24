import ts from "typescript";

export const SCRATCH_FILE_NAME = "__js_repl_scratch_file.js";

/** @type { import("typescript").CompilerOptions } */
const TS_OPTIONS = {
    // TODO
    allowJs: true,
}

/**
    * @param {string} projectRoot 
    * @returns { import(".").LanguageServices }
    * */
export function getLanguageServices(projectRoot) {
    const configFilePath = findConfigFile(projectRoot);
    if (!configFilePath) {
        throw new Error("Could not find a project root");
    }

    const compilerHost = ts.createWatchCompilerHost(configFilePath, TS_OPTIONS, ts.sys);
    const program = ts.createWatchProgram(compilerHost);

    return {
        program,
        compilerHost
    }
}

/**
    * @param {string} projectRoot 
    * @returns { string | undefined }
    * */
export function findConfigFile(projectRoot) {
    let configFile = ts.findConfigFile(projectRoot, ts.sys.fileExists, "tsconfig.json");
    if (configFile) return configFile;

    configFile = ts.findConfigFile(projectRoot, ts.sys.fileExists, "jsconfig.json");
    if (configFile) return configFile;

    configFile = ts.findConfigFile(projectRoot, ts.sys.fileExists, "package.json");
    return configFile;
}

/**
    * @param {import("../repl").REPLSession} session 
    * */
export function getSessionScratchFile(session) {
    if (!session.scratchFile) {
        session.scratchFile = createSourceFile(SCRATCH_FILE_NAME, "console.log('foo');");
    }
    return session.scratchFile;
}

/**
 * @param {string} name
 * @param {string} content
 */
export function createSourceFile(name, content) {
    return ts.createSourceFile(name, content, ts.ScriptTarget.Latest, false, ts.ScriptKind.JS);
}
