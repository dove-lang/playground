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
    document.getElementById("download-btn")?.addEventListener("click", downloadBtnPressed);
    document.getElementById("change-theme-btn")?.addEventListener("click", changeThemeBtnPressed);
    document.getElementById("submit-modal-btn")?.addEventListener("click", submitFileBtnPressed);
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
    const inputValue = editorObj.getValue();
    const resValue = wasm.run(inputValue).join("\n");

    outputObj.setValue(resValue);
}

function downloadBtnPressed() {
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

function submitFileBtnPressed() {
    const inputFile = document.getElementById("input-file")! as HTMLInputElement;
    const files = inputFile.files;
    const reader = new FileReader();

    if (files == null || files?.length == 0) { return; }

    reader.onload = (event) => {
        const res = event.target?.result as string;

        // Update editor.
        editorObj.setValue(res);

        // Update output.
        const out = wasm.run(res).join("\n");
        outputObj.setValue(out);
    }
    reader.readAsText(files[0]);
}
