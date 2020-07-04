onmessage = async e => {
    const wasm = await import("../../pkg/dove_wasm");
    const result = wasm.run(e.data.source).join("\n");
    postMessage(result);
};
