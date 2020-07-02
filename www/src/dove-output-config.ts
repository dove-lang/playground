import * as monaco from "monaco-editor";

export const doveOutputMonarchLanguage = <monaco.languages.IMonarchLanguage> {
    tokenizer: {
        root: [
            [/^\[error].*/, { token: "dove-error" }],
            [/^\[warning].*/, { token: "dove-warning" }],
            [/^\[line.*/, { token: "dove-error" }]
        ]
    }
}
