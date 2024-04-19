import test from "node:test";
import * as fs from "fs";
import assert from 'node:assert/strict';
import { readFileRange } from "../src/file/file.js";

test("Reading file ranges", async () => {
    const BASIC_FIXTURE = "./fixtures/basic.fixture.js"

    const fileOutput = await readFileRange(BASIC_FIXTURE)

    assert(fileOutput, fs.readFileSync(BASIC_FIXTURE, { encoding: "utf8" }));
})
