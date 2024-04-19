import test from "node:test";
import { getProgramForProject } from "../src/tsserver/program.js";
import assert from "node:assert";

test("Test project sets up properly", () => {
    const TEST_FILE = "./src/file/file.js"
    const TEST_FILE_NO_RELATIVE = "src/file/file.js"

    const program = getProgramForProject(process.cwd(), [TEST_FILE]);

    assert.ok(program.getSourceFiles().find(sf => sf.fileName === TEST_FILE_NO_RELATIVE) !== undefined)
});
