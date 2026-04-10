// Selecionando elementos
const fileInput = document.getElementById("fileInput");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const toJsonBtn = document.getElementById("toJson");
const toCsvBtn = document.getElementById("toCsv");
const downloadBtn = document.getElementById("downloadBtn");

// Teste de clique
toJsonBtn.addEventListener("click", () => {
  console.log("CSV to JSON button clicked");
});

toCsvBtn.addEventListener("click", () => {
  console.log("JSON to CSV button clicked");
});

// Teste de upload
fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];

  if (!file) {
    console.log("Nenhum arquivo selecionado!");
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