export namespace Editor {
    export const INITIAL_EDITOR_VAL =
`// Dove 0.1.2 (default)
// Visit https://github.com/dove-lang for more information.

for name in ("foo", "bar") {
    print "Hello World! " + name
}
`;

    export const INITIAL_OUTPUT_VAL =
`[warning] This is a warning.
[error] This is an error.
[line 1] This is an error with a line number.
"Hello World! foo"
"Hello World! bar"`
}

export namespace General {
    export const DEFAULT_DL_FILENAME = "dove-playground.dove";
}
