export interface SelectionRange {
    start: number;
    end: number;
}

export interface Position {
    line: number;
    character: number;
}

export enum EvaluationType {
    File = "FileEvaluation",
    Range = "RangeEvaluation",
    Line = "LineEvaluation",
    Function = "FunctionEvaluation",
    FunctionContent = "FunctionContentEvaluation",
    FunctionCall = "FunctionCallEvaluation"

}

export interface EvaluationResult {
    success: boolean;
    evaluationType: EvaluationType;
    result: unknown; // TODO
    prompts: Prompt[];
    actions: Action[];
}

// TODO: For use to prompt the user to supply extra information
export interface Prompt {

}

// TODO: For use to execute actions on the existing file or REPL
// Actions include adding a comment to file, printing out a result to REPL, showing function signatures etc...
export interface Action {

}
