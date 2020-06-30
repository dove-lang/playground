import * as monaco from 'monaco-editor';

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
    const editorContainer = document.getElementById("main-editor");
    if (editorContainer) {
        editorObj = monaco.editor.create(editorContainer, {
            value: "console.log(\"hey, boss\")",
            language: "javascript"
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
function runBtnPressed() {
    console.log("run btn pressed.")
}

function downloadBtnPressed() {
    console.log("download btn pressed.")

    const value = editorObj.getValue();
    download("dove-playground.dove", value);
}

//https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
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
