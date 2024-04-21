import { getLanguageServices } from "../tsserver/program.js";
import { getSessionizedRepl, saveReplSession } from "./session.js";

/**
 * The entrypoint to initializing a REPL session with a
 * editor or a tool and the repl server.
 *
 * Initializes the TSServer program and other metadata cacheing it
 * for use on consecutive requests.
    *
    * @param {string} projectRoot 
    * @returns { import(".").REPLSession }
 * */
export function initializeRepl(projectRoot) {
    const sessionRepl = getSessionizedRepl(projectRoot)
    if (sessionRepl) {
        return sessionRepl;
    }

    /** @type { import(".").REPLSession } */
    const replSession = {
        languageServices: getLanguageServices(projectRoot)
    };

    saveReplSession(projectRoot, replSession);
    return replSession;
}
