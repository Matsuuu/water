import { readFileRange } from "../file/file.js";

/**
 * @param {string} filePath
 * @param {import("../types").SelectionRange} range
 */
export function getRangeSelection(filePath, range) {
    return readFileRange(filePath, range);
}

/**
 * @param {string} filePath
 */
export function getFileSelection(filePath) {
    return readFileRange(filePath);
}

/**
 * @param {string} filePath
 * @param {import("../types").Position} position
 */
export function getFunctionSelection(filePath, position) {
    // TODO: Implement
}

/**
 * @param {string} filePath
 * @param {import("../types").Position} position
 */
export function getLineSelection(filePath, position) {
    // TODO: Implement
}
