import test from "node:test";
import { getProjectRoot } from "../src/project/project.js";
import assert from "node:assert";

test("Project root is mapped correctly", () => {
    const root = getProjectRoot("./src/index.js");
    assert.equal(process.env.PWD, root);
});
