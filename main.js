import { csvToJson } from "./utils/csvToJson.js";
import { jsonToCsv } from "./utils/jsonToCsv.js";

// Selecionando elementos
const fileInput = document.getElementById("fileInput");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const statusMessage = document.getElementById("statusMessage");

const toJsonBtn = document.getElementById("toJson");
const toCsvBtn = document.getElementById("toCsv");
const downloadBtn = document.getElementById("downloadBtn");

toJsonBtn.addEventListener("click", () => {
  try {
    const input = inputText.value;
    const format = detectFormat(input);

    if (format !== "csv") {
      alert("A entrada não é um arquivo CSV válido.", "error");
      return;
    }

    if (!input.trim()) {
      alert("A entrada está vazia");
      return;
    }

    const result = csvToJson(input);
    const formatted = JSON.stringify(result, null, 2);

    outputText.value = formatted;

    lastResult = formatted;
    lastType = "json";

    setStatus("Convertido para JSON com sucesso.")
  } catch (error) {
    alert("Erro ao converter CSV para JSON");
    setStatus(error.message, "error");
  }
});

toCsvBtn.addEventListener("click", () => {
  try {
    const input = inputText.value;
    const format = detectFormat(input);

    if (format !== "json") {
      alert("A entrada não é um arquivo JSON válido.")
      return;
    }

    if (!input.trim()) {
      alert("A entrada está vazia");
      return;
    }

    const result = jsonToCsv(input);

    outputText.value = result;

    lastResult = result;
    lastType = "csv";

    setStatus("Convertido para CSV com sucesso.")
  } catch (error) {
    alert("Erro ao converter JSON para CSV");
    setStatus(error.message, "error");
  }
});

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

    inputText.dispatchEvent(new Event("input"));
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
    alert("Não há nada para baixar.", "error");
    return;
  }

  const blob = new Blob([lastResult], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `converted.${lastType}`;
  a.click();

  setStatus("Download iniciado")
});

function detectFormat(text) {
  const trimmed = text.trim();

  if (!trimmed) return null;

  // tenta json
  try {
    const parsed = JSON.parse(trimmed);

    if (Array.isArray(parsed)) {
      return "json";
    }

    return "invalid-json";
  } catch {
    // valida se parece CSV de verdade
    if (trimmed.includes(",") && trimmed.includes("\n")) {
      return "csv";
    }

    return "unknown";
  }
}

inputText.addEventListener("input", () => {
  const format = detectFormat(inputText.value);

  if (format === "json") {
    formatInfo.textContent = "Detected: JSON";
  } else if (format === "csv") {
    formatInfo.textContent = "Detected: CSV";
  } else if (format === "invalid-json") {
    formatInfo.textContent = "Invalid JSON format";
  } else {
    formatInfo.textContent = "";
  }
});

document.getElementById("autoConvert").addEventListener("click", () => {
  const input = inputText.value;
  const format = detectFormat(input);

  if (format === "csv") {
    toJsonBtn.click();
  } else if (format === "json") {
    toCsvBtn.click();
  } else {
    alert("Entrada inválida");
  }
});

function setStatus(message, type = "success") {
  statusMessage.textContent = message;
  statusMessage.className = type;
}
