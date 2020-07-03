(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/bat/bat.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/bat/bat.js ***!
  \**********************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: 'REM'\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n    ],\r\n    folding: {\r\n        markers: {\r\n            start: new RegExp(\"^\\\\s*(::\\\\s*|REM\\\\s+)#region\"),\r\n            end: new RegExp(\"^\\\\s*(::\\\\s*|REM\\\\s+)#endregion\")\r\n        }\r\n    }\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    ignoreCase: true,\r\n    tokenPostfix: '.bat',\r\n    brackets: [\r\n        { token: 'delimiter.bracket', open: '{', close: '}' },\r\n        { token: 'delimiter.parenthesis', open: '(', close: ')' },\r\n        { token: 'delimiter.square', open: '[', close: ']' }\r\n    ],\r\n    keywords: /call|defined|echo|errorlevel|exist|for|goto|if|pause|set|shift|start|title|not|pushd|popd/,\r\n    // we include these common regular expressions\r\n    symbols: /[=><!~?&|+\\-*\\/\\^;\\.,]+/,\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            [/^(\\s*)(rem(?:\\s.*|))$/, ['', 'comment']],\r\n            [/(\\@?)(@keywords)(?!\\w)/, [{ token: 'keyword' }, { token: 'keyword.$2' }]],\r\n            // whitespace\r\n            [/[ \\t\\r\\n]+/, ''],\r\n            // blocks\r\n            [/setlocal(?!\\w)/, 'keyword.tag-setlocal'],\r\n            [/endlocal(?!\\w)/, 'keyword.tag-setlocal'],\r\n            // words\r\n            [/[a-zA-Z_]\\w*/, ''],\r\n            // labels\r\n            [/:\\w*/, 'metatag'],\r\n            // variables\r\n            [/%[^%]+%/, 'variable'],\r\n            [/%%[\\w]+(?!\\w)/, 'variable'],\r\n            // punctuations\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/@symbols/, 'delimiter'],\r\n            // numbers\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\r\n            [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],\r\n            [/\\d+/, 'number'],\r\n            // punctuation: after number because of .\\d floats\r\n            [/[;,.]/, 'delimiter'],\r\n            // strings:\r\n            [/\"/, 'string', '@string.\"'],\r\n            [/'/, 'string', '@string.\\''],\r\n        ],\r\n        string: [\r\n            [/[^\\\\\"'%]+/, {\r\n                    cases: {\r\n                        '@eos': { token: 'string', next: '@popall' },\r\n                        '@default': 'string'\r\n                    }\r\n                }],\r\n            [/@escapes/, 'string.escape'],\r\n            [/\\\\./, 'string.escape.invalid'],\r\n            [/%[\\w ]+%/, 'variable'],\r\n            [/%%[\\w]+(?!\\w)/, 'variable'],\r\n            [/[\"']/, {\r\n                    cases: {\r\n                        '$#==$S2': { token: 'string', next: '@pop' },\r\n                        '@default': 'string'\r\n                    }\r\n                }],\r\n            [/$/, 'string', '@popall']\r\n        ],\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/bat/bat.js?");

/***/ })

}]);