import * as monaco from "monaco-editor";

export const doveMonarchLanguage = <monaco.languages.IMonarchLanguage> {
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',
    keywords: [
        'and', 'break', 'class', 'continue', 'else', 'false', 'fun', 'for', 'from', 'import', 'in', 'if', 'lambda', 'nil', 'not', 'or',
        'print', 'return', 'super', 'self', 'true', 'while'
    ],
    typeKeywords: ['let'],
    operators: [
        '+', '+=', '++', '*', '*=',
        '=', '==',
        '/', '/>', '/=', '/<',
        '-', '-=', '->',
        '.', '..', '...',
        '!', '!=', '<', '<=', '>', '>=',
        '%'
    ],
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword' },
                    '@typeKeywords': { token: 'type' },
                    '@default': 'identifier'
                }
            }],
            // whitespace
            { include: '@whitespace' },
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
            [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/,       'comment', '@comment' ],
            [/\/\/.*$/,    'comment'],
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
        comment: [
            [/[^\/*]+/, 'comment' ],
            [/\/\*/,    'comment', '@push' ],    // nested comment
            ["\\*/",    'comment', '@pop'  ],
            [/[\/*]/,   'comment' ]
        ]
    },
}

export const doveAdvancedLanguageConfig = <monaco.languages.LanguageConfiguration> {
    autoClosingPairs: [
        {
            close: "}",
            notIn: [],
            open: "{"
        },
        {
            close: "]",
            notIn: [],
            open: "["
        },
        {
            close: ")",
            notIn: [],
            open: "("
        },
        {
            close: "\"",
            notIn: [],
            open: "\""
        },
        {
            close: "*/",
            notIn: [],
            open: "/*"
        }
    ],
    brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
        ["/*", "*/"]
    ],
    comments: {
        blockComment: ["/*", "*/"],
        lineComment: "//"
    }
}
