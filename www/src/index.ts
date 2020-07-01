import * as monaco from 'monaco-editor';

import {monarchLanguage} from "./dove-monarch";
import {Editor, General} from "./settings";

// Fix "WebAssembly is included in initial chunk" issue
// https://github.com/rustwasm/rust-webpack-template/issues/43#issuecomment-426597176
// noinspection JSUnusedLocalSymbols
function start(wasm: typeof import('hello-wasm-pack')) {
    console.log("All modules loaded");
    // wasm.greet();

    // TODO: application code here (after wasm loads)
}

async function load() {
    start(await import('hello-wasm-pack'));
}

let editorObj: monaco.editor.IStandaloneCodeEditor;

load().then(() => {
    // Setup language:
    // - syntax highlighting,
    // - TODO: code folding, use `richLanguageConfiguration`
    setupLanguage();

    const editorContainer = document.getElementById("main-editor");
    if (editorContainer) {
        editorObj = monaco.editor.create(editorContainer, {
            value: Editor.INITIAL_EDITOR_VAL,
            language: Editor.LANG_ID
        })
    }

    // Add event listeners for navbar items.
    const runBtn = document.getElementById("run-btn");
    const downloadBtn = document.getElementById("download-btn");

    if (runBtn != null && downloadBtn != null) {
        runBtn.addEventListener("click", runBtnPressed);
        downloadBtn.addEventListener("click", downloadBtnPressed);
    }
});

// Helpers.
function setupLanguage() {
    monaco.languages.register({ id: Editor.LANG_ID });
    monaco.languages.setMonarchTokensProvider(Editor.LANG_ID, monarchLanguage);
}

function runBtnPressed() {
    console.log("run btn pressed.")
}

function downloadBtnPressed() {
    console.log("download btn pressed.")

    const value = editorObj.getValue();
    download(General.DEFAULT_DL_FILENAME, value);
}

/**
 * Download string with `filename`.
 * https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
 *
 * @param filename - string the defines the filename
 * @param text - string that defines the content of the downloaded file
 */
function download(filename: string, text: string) {
    const pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}
