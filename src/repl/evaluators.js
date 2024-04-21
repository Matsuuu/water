//TODO: We have the session setup now and have TSServer instance for anything we want to do.
//
// As for using a REPL, we want to create a "scratch" file for dumping everything we evaluate into. This also means that 
// if we map anything into a global thing like window and document, we want to persist those.
//
// As for evaluating, this means that if we evaluate function, files, ranges, anything that has anything scoped,
// we want those scopes to appear in that file. 
//
// Some pitfalls we need to think of...
//
// Evaluating a full file is ok, as we can just copy a sourcefile into the scope.
// Evaluating a line is a bit interesting as we want to evaluate it for the case that it's just a function call 
// but we also need to think about the case where we are evaluating just something to be scoped for use later.
//
// As for the thing above, we want to kind of have a good DX in the sense that if the evaluated code contains variable
// declarations, we might want to replace already existing ones, e.g. user overwriting a const variable.
//
// What this means is that kind of want to maybe always AST-fy the variables in the file and go through each variable declaration 
// and then do magic depending on it.
//
// As for what to do next, let's just make the happy path of evaluating clear code and returning responses the first goal.
// After that, we focus on variables and scopes.
;



export function evaluateRange() {

}
