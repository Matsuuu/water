import { getNodeAtPosition, getParentNodeByCondition } from '../ast/finder.js';
import { readFileLine, readFileRange } from '../file/file.js';
import ts from 'typescript';
import { getLanguageServices } from '../tsserver/program.js';

// TODO: Make these work with a request object.
// We need the file, the action and the project root from the client

/**
 * @param {string} filePath
 */
export function getFileSelection(filePath) {
    return readFileRange(filePath);
}

/**
 * @param {string} filePath
 * @param {import("../types").SelectionRange} range
 */
export function getRangeSelection(filePath, range) {
    return readFileRange(filePath, range);
}

/**
 * @param {string} filePath
 * @param {number} lineNumber
 */
export function getLineSelection(filePath, lineNumber) {
    return readFileLine(filePath, lineNumber);
}

/**
 * @param {string} projectRoot
 * @param {string} filePath
 * @param {import("../types").Position} position
 * @returns { ts.FunctionLikeDeclaration }
 */
export function getFunctionSelection(projectRoot, filePath, position) {
    const languageServices = getLanguageServices(projectRoot);
    const program = languageServices.program;

    const sf = program.getProgram().getSourceFile(filePath);
    const nodeAtPosition = getNodeAtPosition(sf, position);

    const functionChecker = (/** @type {ts.Node} */ node) => {
        return ts.isFunctionDeclaration(node);
    };

    return getParentNodeByCondition(nodeAtPosition, functionChecker);
}
