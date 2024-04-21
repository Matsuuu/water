import test from "node:test";
import { initializeRepl } from "../src/repl/repl.js";
import path from "path";
import assert from "assert";

const PROJECT_ROOT = process.cwd();
const BASIC_FIXTURE = path.resolve("./fixtures/basic.fixture.js");

test("REPL Session gets created and cached on get", () => {
    const session = initializeRepl(PROJECT_ROOT);
    assert.notEqual(undefined, session);
});

test("REPL Session gets cached one on re-request", () => {
    const session = initializeRepl(PROJECT_ROOT);
    // @ts-ignore
    session._MARKER = "MARKER";

    const newSession = initializeRepl(PROJECT_ROOT);
    // @ts-ignore
    assert.equal(newSession._MARKER, session._MARKER);
});
