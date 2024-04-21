import ts from 'typescript';
import { getTokenAtPosition } from './ts-utils.js';

/**
 * @typedef {(node: ts.Node) => boolean } CheckerFunction
 * */

/**
 * @param {import("typescript").SourceFile} sourceFile
 * @param {import("../types").Position} position
 */
export function getNodeAtPosition(sourceFile, position) {
    // We handle lines at 1 index, TS with 0 index
    const positionIndex = sourceFile.getPositionOfLineAndCharacter(position.line - 1, position.character);
    return getTokenAtPosition(sourceFile, positionIndex);
}

/**
 * @template T
 * @param {ts.SourceFile} sourceFile
 * @param {CheckerFunction} checkerFunction
 * @returns { T | undefined }
 * */
function findNodeByCondition(sourceFile, checkerFunction) {
    /** @type { T | undefined } */
    let foundNode = undefined;

    /** @param { ts.Node } node */
    function findNodeWithCondition(node) {
        if (checkerFunction.apply(null, [node])) {
            foundNode = /** @type {T} */ (node);
            return;
        }
        ts.forEachChild(node, findNodeWithCondition);
    }
    findNodeWithCondition(sourceFile);

    return foundNode;
}

/**
 * @template T
 * @param {ts.SourceFile} sourceFile
 * @param {CheckerFunction} checkerFunction
 * @returns { T | undefined }
 * */
function findParentNodeByCondition(sourceFile, checkerFunction) {
    /** @type { T | undefined } */
    let foundNode = undefined;

    /** @param { ts.Node } node */
    function findNodeWithCondition(node) {
        if (checkerFunction.apply(null, [node])) {
            foundNode = /** @type {T} */ (node);
            return;
        }
        ts.forEachChild(node, findNodeWithCondition);
    }
    findNodeWithCondition(sourceFile);

    return foundNode;
}

/**
 * @template T
 * @param {ts.Node} node
 * @param {CheckerFunction} checkerFunction
 * @returns { T | undefined }
 * */
export function getParentNodeByCondition(node, checkerFunction) {
    const parentList = getNodeParentList(node);
    return /** @type {T | undefined} */ (parentList.find(checkerFunction));
}

/**
 * @param { ts.Node } node
 * */
export function getNodeParentList(node) {
    /** @type { Array<ts.Node> } */
    let parentList = [];
    let current = node;
    while (current.parent) {
        parentList.push(current.parent);
        current = current.parent;
    }

    return parentList;
}

/**
 * @template T
 * @param {ts.SourceFile} sourceFile
 * @param {CheckerFunction} checkerFunction
 * @returns { Array<T> }
 * */
function findNodesByCondition(sourceFile, checkerFunction) {
    /** @type { Array<T> } */
    let foundNodes = [];

    /** @param { ts.Node } node */
    function findNodeWithCondition(node) {
        if (checkerFunction.apply(null, [node])) {
            foundNodes.push(/** @type {T} */(node));
        }
        ts.forEachChild(node, findNodeWithCondition);
    }
    findNodeWithCondition(sourceFile);

    return foundNodes;
}
