import test from "node:test";
import assert from "node:assert";
import { getLanguageServices } from "../src/tsserver/program.js";
import path from "path";

const PROJECT_ROOT = process.cwd();
const BASIC_FIXTURE = path.resolve("./fixtures/basic.fixture.js");

test("Test project sets up properly", () => {
    const { program } = getLanguageServices(PROJECT_ROOT);

    assert.ok(program.getProgram().getSourceFiles().find(sf => sf.fileName === BASIC_FIXTURE) !== undefined)
});

