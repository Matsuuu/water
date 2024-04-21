import { getNodeAtPosition, getParentNodeByCondition } from "../ast/finder.js";
import { readFileLine, readFileRange } from "../file/file.js";
import { getProgramForProject } from "../tsserver/program.js";
import ts from "typescript";


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
 * @param {string} filePath
 * @param {import("../types").Position} position
    * @returns { ts.FunctionLikeDeclaration }
 */
export function getFunctionSelection(filePath, position) {
    const program = getProgramForProject(process.cwd(), [filePath]);
    const sf = program.getSourceFile(filePath);
    const nodeAtPosition = getNodeAtPosition(sf, { line: 3, character: 10 })

    const functionChecker = (/** @type {ts.Node} */ node) => {
        return ts.isFunctionDeclaration(node);
    };

    return getParentNodeByCondition(nodeAtPosition, functionChecker);
}

