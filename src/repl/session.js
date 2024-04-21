/**
 * Map containing sessonized repls. Key is project root path
 * @type { Map<string, import(".").REPLSession> }
 * */
const SESSION_MAP = new Map();

/**
 * @param {string} projectRoot
 * @returns { import(".").REPLSession | undefined }
 */
export function getSessionizedRepl(projectRoot) {
    return SESSION_MAP.get(projectRoot);
}

/**
 * @param {string} projectRoot
 * @param {import(".").REPLSession} sessionRepl
 */
export function saveReplSession(projectRoot, sessionRepl) {
    SESSION_MAP.set(projectRoot, sessionRepl);
}
