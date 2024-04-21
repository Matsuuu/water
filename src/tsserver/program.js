import ts from "typescript";

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
