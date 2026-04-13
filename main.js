import { csvToJson } from "./utils/csvToJson.js";
import { jsonToCsv } from "./utils/jsonToCsv.js";

// Selecionando elementos
const fileInput = document.getElementById("fileInput");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const toJsonBtn = document.getElementById("toJson");
const toCsvBtn = document.getElementById("toCsv");
const downloadBtn = document.getElementById("downloadBtn");

// Teste de clique
toJsonBtn.addEventListener("click", () => {
  try {
    const input = inputText.value;

    if (!input.trim()) {
      alert("A entrada está vazia");
      return;
    }

    const result = csvToJson(input);
    const formatted = JSON.stringify(result, null, 2);

    outputText.value = formatted;

    lastResult = formatted;
    lastType = "json";
  } catch (error) {
    alert("Erro ao converter CSV para JSON");
    console.error(error);
  }
});

toCsvBtn.addEventListener("click", () => {
  try {
    const input = inputText.value;

    if (!input.trim()) {
      alert("A entrada está vazia");
      return;
    }

    const result = jsonToCsv(input);

    outputText.value = result;

    lastResult = result;
    lastType = "csv";
  } catch (error) {
    alert("Erro ao converter JSON para CSV");
    console.error(error);
  }
});

// Teste de upload
fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];

  if (!file) {
    console.log("Nenhum arquivo selecionado!");
    return;
  };

  const fileName = file.name.toLowerCase();

  const isCsv = fileName.endsWith(".csv");
  const isJson = fileName.endsWith(".json");

  if (!isCsv && !isJson) {
    alert("Apenas arquivos CSV ou JSON são permitidos.");
    fileInput.value = "";
    return;
  };

  const reader = new FileReader();

  reader.onload = () => {
    inputText.value = reader.result;
  };

  reader.onerror = () => {
    alert("Erro ao ler o arquivo");
  };

  reader.readAsText(file);
});

let lastResult = "";
let lastType = ""; // "json" ou "csv"

downloadBtn.addEventListener("click", () => {
  if (!lastResult) {
    alert("Não há nada para baixar.");
    return;
  }

  const blob = new Blob([lastResult], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `converted.${lastType}`;
  a.click();
});