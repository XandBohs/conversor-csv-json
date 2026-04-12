export function jsonToCsv(json) {
  const data = typeof json === "string" ? JSON.parse(json) : json;

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Invalid JSON");
  }

  const headers = Object.keys(data[0]);

  const rows = data.map(obj =>
    headers.map(header => obj[header]).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}