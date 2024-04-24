//TODO: We have the session setup now and have TSServer instance for anything we want to do.
//
// As for using a REPL, we want to create a "scratch" file for dumping everything we evaluate into. This also means that 
// if we map anything into a global thing like window and document, we want to persist those.
//
// As for evaluating, this means that if we evaluate function, files, ranges, anything that has anything scoped,
// we want those scopes to appear in that file. 
//
// Some pitfalls we need to think of...
//
// Evaluating a full file is ok, as we can just copy a sourcefile into the scope.
// Evaluating a line is a bit interesting as we want to evaluate it for the case that it's just a function call 
// but we also need to think about the case where we are evaluating just something to be scoped for use later.
//
// As for the thing above, we want to kind of have a good DX in the sense that if the evaluated code contains variable
// declarations, we might want to replace already existing ones, e.g. user overwriting a const variable.
//
// What this means is that kind of want to maybe always AST-fy the variables in the file and go through each variable declaration 
// and then do magic depending on it.
//
// As for what to do next, let's just make the happy path of evaluating clear code and returning responses the first goal.
// After that, we focus on variables and scopes.

import { getRangeSelection } from "../selection/selection.js";
import { createSourceFile, getSessionScratchFile } from "../tsserver/program.js";
import ts from "typescript";

;



/**
 * @param {import("./index.js").REPLSession} session
 * @param {string} file
 * @param {import("../types/index.js").SelectionRange} range
 */
export async function evaluateRange(session, file, range) {
    const scratchFile = getSessionScratchFile(session);
    const selection = await getRangeSelection(file, range);
    console.log("SELECTION: ", selection);
    updateScratchFile(scratchFile, selection);
}

/**
 * @param {ts.Node} node
 */
function getChildren(node) {
    // TODO: Get children through `forEachChild` instead of getChildren() to remove syntaxlists

}

/**
 * @param {ts.SourceFile} scratchFile
 * @param {any} content
 */
function updateScratchFile(scratchFile, content) {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const newContent = createSourceFile("temp.js", content);

    console.log("BEFORE ", scratchFile.getFullText());
    const something = ts.factory.createVariableDeclarationList(
        [ts.factory.createVariableDeclaration(
            ts.factory.createIdentifier("something"),
            undefined,
            undefined,
            ts.factory.createStringLiteral("Something")
        )],
        ts.NodeFlags.Const
    )

    const previous = ts.factory.createNodeArray([...scratchFile.getChildren(), something]);
    const output = printer.printList(ts.ListFormat.None, previous, scratchFile);
    /*newCont.getChildren().forEach(child => {
        console.log("Printing node");
        console.log(child.getFullText());
    });*/

    console.log("UPDATED ", scratchFile.getFullText());
    console.log("UPDATED ", output);
}

/**
    * @param {ts.Node} node 
    * @returns { ts.Node }
    * */
function getDeepMutableClone(node) {
    return cloneWithParent(node, undefined);

    /**
        * @param {ts.Node} node 
        * @param {ts.Node | undefined} parent 
        * */
    function cloneWithParent(node, parent) {
        const clone = stripRanges(node);
        // @ts-ignore
        clone.parent = /** @type { ts.Node } */(parent);

        for (const propName of Object.keys(clone)) {
            if (propName === "parent" || propName === "original")
                continue;

            const propValue = clone[propName];
            if (propValue instanceof Array) {
                if (propValue.length > 0 && isNode(propValue[0])) {
                    clone[propName] = propValue.map(child => cloneWithParent(child, clone));
                }
            }
            else if (isNode(propValue)) {
                clone[propName] = cloneWithParent(propValue, clone);
            }
        }

        return clone;
    }
}

/**
    * @param {any} value 
    * @returns { value is ts.Node }
    * */
function isNode(value) {
    return value != null
        && typeof value.pos === "number"
        && typeof value.end === "number"
        && typeof value.kind === "number";
}

// See https://stackoverflow.com/a/57367717/188246 for
// why this is necessary.
/**
    * @param {ts.Node} node 
    * */
function stripRanges(node) {
    // @ts-ignore
    node.pos = -1;
    // @ts-ignore
    node.end = -1;
    return node;
}
