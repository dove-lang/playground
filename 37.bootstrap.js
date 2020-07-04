(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/php/php.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/php/php.js ***!
  \**********************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\?\\s]+)/g,\r\n    comments: {\r\n        lineComment: '//',\r\n        blockComment: ['/*', '*/']\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}', notIn: ['string'] },\r\n        { open: '[', close: ']', notIn: ['string'] },\r\n        { open: '(', close: ')', notIn: ['string'] },\r\n        { open: '\"', close: '\"', notIn: ['string'] },\r\n        { open: '\\'', close: '\\'', notIn: ['string', 'comment'] }\r\n    ],\r\n    folding: {\r\n        markers: {\r\n            start: new RegExp(\"^\\\\s*(#|\\/\\/)region\\\\b\"),\r\n            end: new RegExp(\"^\\\\s*(#|\\/\\/)endregion\\\\b\")\r\n        }\r\n    }\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '',\r\n    // ignoreCase: true,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.root' }],\r\n            [/<!DOCTYPE/, 'metatag.html', '@doctype'],\r\n            [/<!--/, 'comment.html', '@comment'],\r\n            [/(<)(\\w+)(\\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],\r\n            [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],\r\n            [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],\r\n            [/(<)([:\\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\r\n            [/(<\\/)(\\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],\r\n            [/</, 'delimiter.html'],\r\n            [/[^<]+/] // text\r\n        ],\r\n        doctype: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.comment' }],\r\n            [/[^>]+/, 'metatag.content.html'],\r\n            [/>/, 'metatag.html', '@pop'],\r\n        ],\r\n        comment: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.comment' }],\r\n            [/-->/, 'comment.html', '@pop'],\r\n            [/[^-]+/, 'comment.content.html'],\r\n            [/./, 'comment.content.html']\r\n        ],\r\n        otherTag: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.otherTag' }],\r\n            [/\\/?>/, 'delimiter.html', '@pop'],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/[ \\t\\r\\n]+/],\r\n        ],\r\n        // -- BEGIN <script> tags handling\r\n        // After <script\r\n        script: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.script' }],\r\n            [/type/, 'attribute.name', '@scriptAfterType'],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/(<\\/)(script\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\r\n        ],\r\n        // After <script ... type\r\n        scriptAfterType: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptAfterType' }],\r\n            [/=/, 'delimiter', '@scriptAfterTypeEquals'],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <script ... type =\r\n        scriptAfterTypeEquals: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptAfterTypeEquals' }],\r\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\r\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <script ... type = $S2\r\n        scriptWithCustomType: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.scriptWithCustomType.$S2' }],\r\n            [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/script\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        scriptEmbedded: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInEmbeddedState.scriptEmbedded.$S2', nextEmbedded: '@pop' }],\r\n            [/<\\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\r\n        ],\r\n        // -- END <script> tags handling\r\n        // -- BEGIN <style> tags handling\r\n        // After <style\r\n        style: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.style' }],\r\n            [/type/, 'attribute.name', '@styleAfterType'],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/(<\\/)(style\\s*)(>)/, ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }]]\r\n        ],\r\n        // After <style ... type\r\n        styleAfterType: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleAfterType' }],\r\n            [/=/, 'delimiter', '@styleAfterTypeEquals'],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <style ... type =\r\n        styleAfterTypeEquals: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleAfterTypeEquals' }],\r\n            [/\"([^\"]*)\"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\r\n            [/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        // After <style ... type = $S2\r\n        styleWithCustomType: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInSimpleState.styleWithCustomType.$S2' }],\r\n            [/>/, { token: 'delimiter.html', next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],\r\n            [/\"([^\"]*)\"/, 'attribute.value'],\r\n            [/'([^']*)'/, 'attribute.value'],\r\n            [/[\\w\\-]+/, 'attribute.name'],\r\n            [/=/, 'delimiter'],\r\n            [/[ \\t\\r\\n]+/],\r\n            [/<\\/style\\s*>/, { token: '@rematch', next: '@pop' }]\r\n        ],\r\n        styleEmbedded: [\r\n            [/<\\?((php)|=)?/, { token: '@rematch', switchTo: '@phpInEmbeddedState.styleEmbedded.$S2', nextEmbedded: '@pop' }],\r\n            [/<\\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]\r\n        ],\r\n        // -- END <style> tags handling\r\n        phpInSimpleState: [\r\n            [/<\\?((php)|=)?/, 'metatag.php'],\r\n            [/\\?>/, { token: 'metatag.php', switchTo: '@$S2.$S3' }],\r\n            { include: 'phpRoot' }\r\n        ],\r\n        phpInEmbeddedState: [\r\n            [/<\\?((php)|=)?/, 'metatag.php'],\r\n            [/\\?>/, { token: 'metatag.php', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],\r\n            { include: 'phpRoot' }\r\n        ],\r\n        phpRoot: [\r\n            [/[a-zA-Z_]\\w*/, {\r\n                    cases: {\r\n                        '@phpKeywords': { token: 'keyword.php' },\r\n                        '@phpCompileTimeConstants': { token: 'constant.php' },\r\n                        '@default': 'identifier.php'\r\n                    }\r\n                }],\r\n            [/[$a-zA-Z_]\\w*/, {\r\n                    cases: {\r\n                        '@phpPreDefinedVariables': { token: 'variable.predefined.php' },\r\n                        '@default': 'variable.php'\r\n                    }\r\n                }],\r\n            // brackets\r\n            [/[{}]/, 'delimiter.bracket.php'],\r\n            [/[\\[\\]]/, 'delimiter.array.php'],\r\n            [/[()]/, 'delimiter.parenthesis.php'],\r\n            // whitespace\r\n            [/[ \\t\\r\\n]+/],\r\n            // comments\r\n            [/(#|\\/\\/)$/, 'comment.php'],\r\n            [/(#|\\/\\/)/, 'comment.php', '@phpLineComment'],\r\n            // block comments\r\n            [/\\/\\*/, 'comment.php', '@phpComment'],\r\n            // strings\r\n            [/\"/, 'string.php', '@phpDoubleQuoteString'],\r\n            [/'/, 'string.php', '@phpSingleQuoteString'],\r\n            // delimiters\r\n            [/[\\+\\-\\*\\%\\&\\|\\^\\~\\!\\=\\<\\>\\/\\?\\;\\:\\.\\,\\@]/, 'delimiter.php'],\r\n            // numbers\r\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?/, 'number.float.php'],\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float.php'],\r\n            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex.php'],\r\n            [/0[0-7']*[0-7]/, 'number.octal.php'],\r\n            [/0[bB][0-1']*[0-1]/, 'number.binary.php'],\r\n            [/\\d[\\d']*/, 'number.php'],\r\n            [/\\d/, 'number.php'],\r\n        ],\r\n        phpComment: [\r\n            [/\\*\\//, 'comment.php', '@pop'],\r\n            [/[^*]+/, 'comment.php'],\r\n            [/./, 'comment.php']\r\n        ],\r\n        phpLineComment: [\r\n            [/\\?>/, { token: '@rematch', next: '@pop' }],\r\n            [/.$/, 'comment.php', '@pop'],\r\n            [/[^?]+$/, 'comment.php', '@pop'],\r\n            [/[^?]+/, 'comment.php'],\r\n            [/./, 'comment.php']\r\n        ],\r\n        phpDoubleQuoteString: [\r\n            [/[^\\\\\"]+/, 'string.php'],\r\n            [/@escapes/, 'string.escape.php'],\r\n            [/\\\\./, 'string.escape.invalid.php'],\r\n            [/\"/, 'string.php', '@pop']\r\n        ],\r\n        phpSingleQuoteString: [\r\n            [/[^\\\\']+/, 'string.php'],\r\n            [/@escapes/, 'string.escape.php'],\r\n            [/\\\\./, 'string.escape.invalid.php'],\r\n            [/'/, 'string.php', '@pop']\r\n        ],\r\n    },\r\n    phpKeywords: [\r\n        'abstract', 'and', 'array', 'as', 'break',\r\n        'callable', 'case', 'catch', 'cfunction', 'class', 'clone',\r\n        'const', 'continue', 'declare', 'default', 'do',\r\n        'else', 'elseif', 'enddeclare', 'endfor', 'endforeach',\r\n        'endif', 'endswitch', 'endwhile', 'extends', 'false', 'final',\r\n        'for', 'foreach', 'function', 'global', 'goto',\r\n        'if', 'implements', 'interface', 'instanceof', 'insteadof',\r\n        'namespace', 'new', 'null', 'object', 'old_function', 'or', 'private',\r\n        'protected', 'public', 'resource', 'static', 'switch', 'throw', 'trait',\r\n        'try', 'true', 'use', 'var', 'while', 'xor',\r\n        'die', 'echo', 'empty', 'exit', 'eval',\r\n        'include', 'include_once', 'isset', 'list', 'require',\r\n        'require_once', 'return', 'print', 'unset', 'yield',\r\n        '__construct'\r\n    ],\r\n    phpCompileTimeConstants: [\r\n        '__CLASS__',\r\n        '__DIR__',\r\n        '__FILE__',\r\n        '__LINE__',\r\n        '__NAMESPACE__',\r\n        '__METHOD__',\r\n        '__FUNCTION__',\r\n        '__TRAIT__'\r\n    ],\r\n    phpPreDefinedVariables: [\r\n        '$GLOBALS',\r\n        '$_SERVER',\r\n        '$_GET',\r\n        '$_POST',\r\n        '$_FILES',\r\n        '$_REQUEST',\r\n        '$_SESSION',\r\n        '$_ENV',\r\n        '$_COOKIE',\r\n        '$php_errormsg',\r\n        '$HTTP_RAW_POST_DATA',\r\n        '$http_response_header',\r\n        '$argc',\r\n        '$argv'\r\n    ],\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/php/php.js?");

/***/ })

}]);