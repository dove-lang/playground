export namespace Editor {
    export const LANG_ID = "dove";

    export const INITIAL_EDITOR_VAL =
`// Dove 0.1.2 (default)
// Visit https://github.com/dove-lang for more information.

for name in ("foo", "bar") {
    print "Hello World! " + name
}
`;
}

export namespace General {
    export const DEFAULT_DL_FILENAME = "dove-playground.dove";
}
