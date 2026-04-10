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
fileInput.addEventListener("change", (event) => {
  const file = event.target.file[0];

  if (!file) return;

  console.log("File selected:", file.name);
});