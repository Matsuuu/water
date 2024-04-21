import ts from "typescript";

// TS Util Snippet https://github.com/ajafff/tsutils/blob/11da31212257466a2164ca978b782139ca3f38f5/util/util.ts#L151

/** Returns the token at or following the specified position or undefined if none is found inside `parent`. */

/**
 * @param {ts.Node | undefined} parent 
 * @param {number} pos 
 * @param {ts.SourceFile} [sourceFile] 
 */
export function getTokenAtPosition(parent, pos, sourceFile) {
    if (typeof parent === "undefined") return undefined;

    if (pos < parent.pos || pos >= parent.end)
        return;
    if (ts.isTokenKind(parent.kind))
        return parent;
    if (sourceFile === undefined)
        sourceFile = parent.getSourceFile();
    return getTokenAtPositionWorker(parent, pos, sourceFile);
}

/**
 * @param {ts.Node} node - 
 * @param {number} pos - 
 * @param {ts.SourceFile} sourceFile - 
 * @returns {ts.Node | undefined} 
 */
function getTokenAtPositionWorker(node, pos, sourceFile) {
    outer: while (true) {
        for (const child of node.getChildren(sourceFile)) {
            if (child.end > pos && child.kind !== ts.SyntaxKind.JSDocComment) {
                if (ts.isTokenKind(child.kind))
                    return child;
                // next token is nested in another node
                node = child;
                continue outer;
            }
        }
        return;
    }
}

// TS Util End


/**
 * @param {ts.Node} node 
 */
export function printTree(node) {
    let indent = 0;
    /**
     * @param {ts.Node} node
     */
    function print(node) {
        console.log(new Array(indent + 1).join(' ') + ts.SyntaxKind[node.kind]);
        indent++;
        ts.forEachChild(node, print);
        indent--;
    }
    print(node);
    console.log("\n");
}


