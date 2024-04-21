import ts from "typescript";
import { LanguageServices } from "../tsserver";

export interface REPLSession {
    languageServices: LanguageServices;
}
