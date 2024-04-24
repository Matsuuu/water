import test from "node:test";
import { evaluateRange } from "../src/repl/evaluators.js";
import path from "node:path";
import { initializeRepl } from "../src/repl/repl.js";

const PROJECT_ROOT = process.cwd();
const BASIC_FIXTURE = path.resolve("./fixtures/basic.fixture.js");

test('File evaluation executes successfully', () => {

});

test("File evaluation is remembered on next calls", () => {

});

test("Range evaluation executes the code accordingly, returning evaluation result", () => {
    const session = initializeRepl(PROJECT_ROOT);

    const range = { start: 0, end: 30 };
    evaluateRange(session, BASIC_FIXTURE, range);
});

test("Line evaluation executes the code accordingly, returning evaluation result", () => {

});

test("Function evaluation executes the code accordingly, saving function for later calls", () => {

});

test("Function content evaluation executes the code accordingly, returning evaluation result", () => {

});

test("Function call evaluation asks for parameters and executes the code accordingly, returning evaluation result", () => {

});

test("Function call evaluation uses supplied parameters and executes the code accordingly, returning evaluation result", () => {

});

test("Invalid code evaluation returns a error response", () => {

});
