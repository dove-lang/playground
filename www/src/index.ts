import * as monaco from "monaco-editor";

import {doveMonarchLanguage, doveAdvancedLanguageConfig} from "./dove-config";
import {doveOutputMonarchLanguage} from "./dove-output-config";
import {Editor, General} from "./settings";
import {editor} from "monaco-editor";
import IStandaloneThemeData = editor.IStandaloneThemeData;

// Fix "WebAssembly is included in initial chunk" issue
// https://github.com/rustwasm/rust-webpack-template/issues/43#issuecomment-426597176
function start(wasm_in: typeof import("../../pkg/dove_wasm")) {
    console.log("All modules loaded");
    wasm = wasm_in;
}

async function load() {
    start(await import("../../pkg/dove_wasm"));
}

let wasm: typeof import("../../pkg/dove_wasm");

let editorObj: monaco.editor.IStandaloneCodeEditor;
let outputObj: monaco.editor.IStandaloneCodeEditor;
let currentTheme: "vs-dove" | "vs-dark-dove" = "vs-dove";

load().then(() => {
    // Setup language.
    setupThemes();
    setupLanguage();

    // Setup editor div.
    const editorContainer = document.getElementById("main-editor");
    if (editorContainer) {
        editorObj = monaco.editor.create(editorContainer, {
            value: Editor.INITIAL_EDITOR_VAL,
            language: "dove",
            theme: "vs-dove"
        })
    }

    // Setup output div.
    const outputContainer = document.getElementById("run-output");
    if (outputContainer) {
        outputObj = monaco.editor.create(outputContainer, {
            readOnly: true,
            selectionHighlight: false,
            occurrencesHighlight: false,
            renderLineHighlight: "none",
            minimap: { enabled: false },
            value: Editor.INITIAL_OUTPUT_VAL,
            language: "dove-out",
            theme: "vs-dove"
        })
    }

    // Add event listeners for navbar items.
    document.getElementById("run-btn")?.addEventListener("click", runBtnPressed);
    document.getElementById("change-theme-btn")?.addEventListener("click", changeThemeBtnPressed);
    document.getElementById("submit-modal-btn")?.addEventListener("click", submitFileBtnPressed);
    document.getElementById("download-modal-btn")?.addEventListener("click", downloadBtnPressed);

    // Add event listeners for examples side-bar items.
    document.getElementById("fib_ex")?.addEventListener("click", () => {
        loadExampleByName("./examples/fibonacci.dove");
    });
    document.getElementById("quicksort_ex")?.addEventListener("click", () => {
        loadExampleByName("./examples/quick_sort.dove")
    });
    document.getElementById("inheritance_ex")?.addEventListener("click", () => {
        loadExampleByName("./examples/inheritance.dove")
    });
});


// Helpers.
function setupLanguage() {
    // Setup Dove language.
    monaco.languages.register({ id: "dove" });
    monaco.languages.setMonarchTokensProvider("dove", doveMonarchLanguage);
    monaco.languages.setLanguageConfiguration("dove", doveAdvancedLanguageConfig);

    // Setup Dove output language.
    monaco.languages.register({ id: "dove-out" });
    monaco.languages.setMonarchTokensProvider("dove-out", doveOutputMonarchLanguage);
}

function setupThemes() {
    const themeBaseData = {
        colors: {},
        inherit: true,
        rules: [
            { token: 'dove-error', foreground: 'ff0000' },
            { token: 'dove-warning', foreground: 'FFA500' }
        ]
    };
    let defaultData = { base: "vs" };
    let darkData = { base: "vs-dark" };
    monaco.editor.defineTheme("vs-dove", Object.assign(defaultData, themeBaseData) as IStandaloneThemeData);
    monaco.editor.defineTheme("vs-dark-dove", Object.assign(darkData, themeBaseData) as IStandaloneThemeData);
}

function runBtnPressed() {
    outputObj.setValue("Executing code...")

    const inputValue = editorObj.getValue();

    // Using workers with wasm
    // https://github.com/webpack/webpack/issues/7647#issuecomment-423788776
    // Unfortunately using Typescript workers require worker-loader, which does not support (?) wasm
    const worker = new Worker("./worker.js");
    worker.postMessage({
        source: inputValue,
        // wasm,
    });
    worker.onmessage = e => {
        outputObj.setValue(e.data);
    };
}

function downloadBtnPressed() {
    const value = editorObj.getValue();

    const filenameElem = document.getElementById("download-name-input")! as HTMLInputElement;
    const filename = filenameElem.value == "" ? General.DEFAULT_DL_FILENAME : filenameElem.value + ".dove";
    download(filename, value);
}

/**
 * Download string with `filename`.
 * https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
 *
 * @param filename - string the defines the filename
 * @param text - string that defines the content of the downloaded file
 */
function download(filename: string, text: string) {
    const pom = document.createElement("a");
    pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    pom.setAttribute("download", filename);

    if (document.createEvent) {
        const event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

function submitFileBtnPressed() {
    const inputFile = document.getElementById("input-file")! as HTMLInputElement;
    const files = inputFile.files;

    if (files == null || files?.length == 0) { return; }

    handleInputFile(files);
}

/**
 * Load the input file into editor object, and update the output object as well.
 *
 * @param files - a FileList contain one and only one element: input file
 */
function handleInputFile(files: FileList) {
    const reader = new FileReader();

    reader.onload = (event) => {
        const res = event.target?.result as string;

        // Update editor and output.
        const out = wasm.run(res).join("\n");
        editorObj.setValue(res);
        outputObj.setValue(out);
    }
    reader.readAsText(files[0]);
}

function loadExampleByName(filename: string) {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                // Success
                const allText = rawFile.responseText;

                // Update editor and output.
                const out = wasm.run(allText).join("\n");
                editorObj.setValue(allText);
                outputObj.setValue(out);
            }
        }
    }
    rawFile.send(null);

    // Simulate clicking "Examples" nav item to hide the side-bar.
    document.getElementById("ex-sidebar-collapse")!.click();
}

function changeThemeBtnPressed() {
    if (currentTheme == "vs-dove") {
        monaco.editor.setTheme("vs-dark-dove");
        currentTheme = "vs-dark-dove";
        document.getElementById("nav")!.style.backgroundColor = "#242424";
        document.body.style.backgroundColor = "#1a1a1a";
        document.getElementById("dove-brand")!.style.color = "#DDDDDD";
        document.getElementById("changeTheme")!.innerText = "Light Theme";
    } else {
        monaco.editor.setTheme("vs-dove");
        currentTheme = "vs-dove";
        document.getElementById("nav")!.style.backgroundColor = "#f2f2f2";
        document.body.style.backgroundColor = "white";
        document.getElementById("dove-brand")!.style.color = "black";
        document.getElementById("changeTheme")!.innerText = "Dark Theme";
    }
}
