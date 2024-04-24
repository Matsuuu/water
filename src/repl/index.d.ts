import ts from "typescript";
import { LanguageServices } from "../tsserver";

export interface REPLSession {
    languageServices: LanguageServices;
    /** Don't directly access this. Use `getSessionScratchFile()` instead */
    scratchFile?: ts.SourceFile;
}
