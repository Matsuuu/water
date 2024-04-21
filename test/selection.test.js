import test from "node:test";
import * as fs from "fs";
import assert from 'node:assert/strict';
import { getFileSelection, getFunctionSelection, getLineSelection, getRangeSelection } from "../src/selection/selection.js";
import path from "path";

const PROJECT_ROOT = process.cwd();
const BASIC_FIXTURE = path.resolve("./fixtures/basic.fixture.js");

test("Reading file without range", async () => {
    const fileOutput = await getFileSelection(BASIC_FIXTURE)
    assert.equal(fileOutput, fs.readFileSync(BASIC_FIXTURE, { encoding: "utf8" }));
})

test("Reading file range", async () => {
    const fileOutput = await getRangeSelection(BASIC_FIXTURE, { start: 10, end: 28 });
    assert.equal(fileOutput, "thing = \"Something\"");
});

test("Reading file line", async () => {
    const fileOutput = await getLineSelection(BASIC_FIXTURE, 3);
    assert.equal(fileOutput, "function printThing(thing) {");
});

test("Reading file function", async () => {
    const functionSelection = getFunctionSelection(PROJECT_ROOT, BASIC_FIXTURE, { line: 3, character: 10 })

    assert.notEqual(functionSelection, undefined);
    assert.equal(functionSelection.name?.getText(), "printThing");
});
