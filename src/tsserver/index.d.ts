import ts from "typescript";

export interface LanguageServices {
    program: ts.WatchOfConfigFile<ts.BuilderProgram>;
    compilerHost: ts.WatchCompilerHostOfConfigFile<ts.BuilderProgram>;
}
