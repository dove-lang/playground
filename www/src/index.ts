import * as monaco from 'monaco-editor';

// Fix "WebAssembly is included in initial chunk" issue
// https://github.com/rustwasm/rust-webpack-template/issues/43#issuecomment-426597176
function start(wasm: typeof import('hello-wasm-pack')) {
    console.log("All modules loaded");
    // wasm.greet();

    // TODO: application code here (after wasm loads)
}

async function load() {
    start(await import('hello-wasm-pack'));
}

load().then(() => {
    const editorContainer = document.getElementById("main-editor");
    if (editorContainer) {
        monaco.editor.create(editorContainer, {
            value: 'console.log("hey, boss")',
            language: 'javascript'
        })
    }
});
