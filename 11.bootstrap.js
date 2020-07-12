(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/cameligo/cameligo.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/cameligo/cameligo.js ***!
  \********************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '//',\r\n        blockComment: ['(*', '*)'],\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')'],\r\n        ['<', '>'],\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '<', close: '>' },\r\n        { open: '\\'', close: '\\'' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '<', close: '>' },\r\n        { open: '\\'', close: '\\'' },\r\n    ]\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.cameligo',\r\n    ignoreCase: true,\r\n    brackets: [\r\n        { open: '{', close: '}', token: 'delimiter.curly' },\r\n        { open: '[', close: ']', token: 'delimiter.square' },\r\n        { open: '(', close: ')', token: 'delimiter.parenthesis' },\r\n        { open: '<', close: '>', token: 'delimiter.angle' }\r\n    ],\r\n    keywords: [\r\n        'abs', 'begin', 'Bytes', 'Crypto', 'Current', 'else', 'end', 'failwith',\r\n        'false', 'fun', 'if', 'in', 'let', 'let%entry', 'let%init', 'List', 'list',\r\n        'Map', 'map', 'match', 'match%nat', 'mod', 'not', 'operation', 'Operation', 'of',\r\n        'Set', 'set', 'sender', 'source', 'String', 'then', 'true', 'type', 'with',\r\n    ],\r\n    typeKeywords: [\r\n        'int', 'unit', 'string', 'tz',\r\n    ],\r\n    operators: [\r\n        '=', '>', '<', '<=', '>=', '<>', ':', ':=', 'and', 'mod', 'or',\r\n        '+', '-', '*', '/', '@', '&', '^', '%', '->', '<-'\r\n    ],\r\n    // we include these common regular expressions\r\n    symbols: /[=><:@\\^&|+\\-*\\/\\^%]+/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            // identifiers and keywords\r\n            [/[a-zA-Z_][\\w]*/, {\r\n                    cases: {\r\n                        '@keywords': { token: 'keyword.$0' },\r\n                        '@default': 'identifier'\r\n                    }\r\n                }],\r\n            // whitespace\r\n            { include: '@whitespace' },\r\n            // delimiters and operators\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/[<>](?!@symbols)/, '@brackets'],\r\n            [/@symbols/, {\r\n                    cases: {\r\n                        '@operators': 'delimiter',\r\n                        '@default': ''\r\n                    }\r\n                }],\r\n            // numbers\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\r\n            [/\\$[0-9a-fA-F]{1,16}/, 'number.hex'],\r\n            [/\\d+/, 'number'],\r\n            // delimiter: after number because of .\\d floats\r\n            [/[;,.]/, 'delimiter'],\r\n            // strings\r\n            [/'([^'\\\\]|\\\\.)*$/, 'string.invalid'],\r\n            [/'/, 'string', '@string'],\r\n            // characters\r\n            [/'[^\\\\']'/, 'string'],\r\n            [/'/, 'string.invalid'],\r\n            [/\\#\\d+/, 'string']\r\n        ],\r\n        /* */\r\n        comment: [\r\n            [/[^\\(\\*]+/, 'comment'],\r\n            //[/\\(\\*/,    'comment', '@push' ],    // nested comment  not allowed :-(\r\n            [/\\*\\)/, 'comment', '@pop'],\r\n            [/\\(\\*/, 'comment']\r\n        ],\r\n        string: [\r\n            [/[^\\\\']+/, 'string'],\r\n            [/\\\\./, 'string.escape.invalid'],\r\n            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]\r\n        ],\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, 'white'],\r\n            [/\\(\\*/, 'comment', '@comment'],\r\n            [/\\/\\/.*$/, 'comment'],\r\n        ],\r\n    },\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/cameligo/cameligo.js?");

/***/ })

}]);