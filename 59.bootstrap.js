(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[59],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/tcl/tcl.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/tcl/tcl.js ***!
  \**********************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n    ]\r\n};\r\nvar language = {\r\n    tokenPostfix: '.tcl',\r\n    specialFunctions: [\r\n        'set', 'unset', 'rename', 'variable', 'proc', 'coroutine',\r\n        'foreach',\r\n        'incr', 'append',\r\n        'lappend', 'linsert', 'lreplace'\r\n    ],\r\n    mainFunctions: [\r\n        'if', 'then', 'elseif', 'else', 'case', 'switch', 'while', 'for',\r\n        'break', 'continue', 'return',\r\n        'package', 'namespace',\r\n        'catch', 'exit',\r\n        'eval', 'expr', 'uplevel', 'upvar'\r\n    ],\r\n    builtinFunctions: [\r\n        'file', 'info', 'concat', 'join', 'lindex',\r\n        'list', 'llength', 'lrange', 'lsearch', 'lsort', 'split',\r\n        'array', 'parray', 'binary', 'format', 'regexp', 'regsub', 'scan', 'string',\r\n        'subst', 'dict', 'cd', 'clock', 'exec', 'glob', 'pid', 'pwd', 'close', 'eof', 'fblocked',\r\n        'fconfigure', 'fcopy', 'fileevent', 'flush', 'gets', 'open', 'puts', 'read', 'seek',\r\n        'socket', 'tell', 'interp', 'after', 'auto_execok',\r\n        'auto_load', 'auto_mkindex', 'auto_reset', 'bgerror', 'error',\r\n        'global', 'history', 'load', 'source', 'time', 'trace',\r\n        'unknown', 'unset', 'update', 'vwait', 'winfo', 'wm', 'bind', 'event',\r\n        'pack', 'place', 'grid', 'font', 'bell', 'clipboard', 'destroy', 'focus', 'grab', 'lower',\r\n        'option', 'raise', 'selection', 'send', 'tk', 'tkwait', 'tk_bisque', 'tk_focusNext',\r\n        'tk_focusPrev', 'tk_focusFollowsMouse', 'tk_popup', 'tk_setPalette'\r\n    ],\r\n    symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\r\n    brackets: [\r\n        { open: '(', close: ')', token: 'delimiter.parenthesis' },\r\n        { open: '{', close: '}', token: 'delimiter.curly' },\r\n        { open: '[', close: ']', token: 'delimiter.square' }\r\n    ],\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"'\\[\\]\\{\\};\\$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n    variables: /(?:\\$+(?:(?:\\:\\:?)?[a-zA-Z_]\\w*)+)/,\r\n    tokenizer: {\r\n        root: [\r\n            // identifiers and keywords\r\n            [/[a-zA-Z_]\\w*/, { cases: {\r\n                        '@specialFunctions': { token: 'keyword.flow', next: '@specialFunc' },\r\n                        '@mainFunctions': 'keyword',\r\n                        '@builtinFunctions': 'variable',\r\n                        '@default': 'operator.scss'\r\n                    } }],\r\n            [/\\s+\\-+(?!\\d|\\.)\\w*|{\\*}/, 'metatag'],\r\n            // whitespace\r\n            { include: '@whitespace' },\r\n            // delimiters and operators\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/@symbols/, 'operator'],\r\n            [/\\$+(?:\\:\\:)?\\{/, { token: 'identifier', next: '@nestedVariable' }],\r\n            [/@variables/, 'type.identifier'],\r\n            [/\\.(?!\\d|\\.)[\\w\\-]*/, 'operator.sql'],\r\n            // numbers\r\n            [/\\d+(\\.\\d+)?/, 'number'],\r\n            [/\\d+/, 'number'],\r\n            // delimiter\r\n            [/;/, 'delimiter'],\r\n            // strings\r\n            [/\"/, { token: 'string.quote', bracket: '@open', next: '@dstring' }],\r\n            [/'/, { token: 'string.quote', bracket: '@open', next: '@sstring' }]\r\n        ],\r\n        dstring: [\r\n            [/\\[/, { token: '@brackets', next: '@nestedCall' }],\r\n            [/\\$+(?:\\:\\:)?\\{/, { token: 'identifier', next: '@nestedVariable' }],\r\n            [/@variables/, 'type.identifier'],\r\n            [/[^\\\\$\\[\\]\"]+/, 'string'],\r\n            [/@escapes/, 'string.escape'],\r\n            [/\"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],\r\n        ],\r\n        sstring: [\r\n            [/\\[/, { token: '@brackets', next: '@nestedCall' }],\r\n            [/\\$+(?:\\:\\:)?\\{/, { token: 'identifier', next: '@nestedVariable' }],\r\n            [/@variables/, 'type.identifier'],\r\n            [/[^\\\\$\\[\\]']+/, 'string'],\r\n            [/@escapes/, 'string.escape'],\r\n            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]\r\n        ],\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, 'white'],\r\n            [/#.*\\\\$/, { token: 'comment', next: '@newlineComment' }],\r\n            [/#.*(?!\\\\)$/, 'comment']\r\n        ],\r\n        newlineComment: [\r\n            [/.*\\\\$/, 'comment'],\r\n            [/.*(?!\\\\)$/, { token: 'comment', next: '@pop' }]\r\n        ],\r\n        nestedVariable: [\r\n            [/[^\\{\\}\\$]+/, 'type.identifier'],\r\n            [/\\}/, { token: 'identifier', next: '@pop' }]\r\n        ],\r\n        nestedCall: [\r\n            [/\\[/, { token: '@brackets', next: '@nestedCall' }],\r\n            [/\\]/, { token: '@brackets', next: '@pop' }],\r\n            { include: 'root' }\r\n        ],\r\n        specialFunc: [\r\n            [/\"/, { token: 'string', next: '@dstring' }],\r\n            [/'/, { token: 'string', next: '@sstring' }],\r\n            [/\\S+/, { token: 'type', next: '@pop' }],\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/tcl/tcl.js?");

/***/ })

}]);