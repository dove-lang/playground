// Fix "WebAssembly is included in initial chunk" issue
// https://github.com/rustwasm/rust-webpack-template/issues/43#issuecomment-426597176
function start(wasm: typeof import('hello-wasm-pack')) {
    console.log("All modules loaded");

    console.log("Hi Boss");
    console.log("Hey Boss test");

    wasm.greet();

    // TODO: application code here (after wasm loads)
}

async function load() {
    start(await import('hello-wasm-pack'));
}

load();
