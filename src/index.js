import path from "path";
import { evaluateRange } from "./repl/evaluators.js";
import { initializeRepl } from "./repl/repl.js";

const PROJECT_ROOT = process.cwd();
const BASIC_FIXTURE = path.resolve("./fixtures/basic.fixture.js");


const session = initializeRepl(PROJECT_ROOT);

const range = { start: 0, end: 30 };
evaluateRange(session, BASIC_FIXTURE, range);
