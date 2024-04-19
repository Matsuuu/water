import test from "node:test";
import * as fs from "fs";
import assert from 'node:assert/strict';
import { readFileRange } from "../src/file/file.js";

const BASIC_FIXTURE = "./fixtures/basic.fixture.js"

test("Reading file ranges", async () => {
    const fileOutput = await readFileRange(BASIC_FIXTURE)

    assert.equal(fileOutput, fs.readFileSync(BASIC_FIXTURE, { encoding: "utf8" }));
})

test("Reading file range", async () => {
    const fileOutput = await readFileRange(BASIC_FIXTURE, { start: 10, end: 28 });

    assert.equal(fileOutput, "thing = \"Something\"");
});
