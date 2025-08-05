const fs = require("fs");

const ancestryMerged = JSON.parse(fs.readFileSync("./2023/ancestry-merge.json", "utf-8"));
const variableLabels = JSON.parse(fs.readFileSync("census-bureau-variables.json", "utf-8"));
const districtLabels = JSON.parse(fs.readFileSync("district-label-map.json", "utf-8"));

// Step 1: Rename variables using the label lookup
const renamedRows = ancestryMerged.map(row => {
  const renamed = {};
  for (const key in row) {
    const label = variableLabels[key] || key; // fallback to original variable name
    renamed[label] = row[key];
  }
  return renamed;
});

// Step 2: Pivot the data so district labels become columns
function pivotByDistrict(rows) {
  const pivoted = {};

  rows.forEach(row => {
    const { NAME, state, district, ...variables } = row;
    const geoID = state + district; // matches key in district-label-map.json
    const districtName = districtLabels[geoID] || geoID;

    for (const [label, value] of Object.entries(variables)) {
      if (!pivoted[label]) pivoted[label] = { Topic: "", Subject: "", Title: label };
      pivoted[label][districtName] = value;
    }
  });

  return Object.values(pivoted);
}

// Step 3: Convert to CSV
function toCSV(rows) {
  const headers = Array.from(
    new Set(rows.flatMap(row => Object.keys(row)))
  );
  const csv = [
    headers.join(","),
    ...rows.map(row => headers.map(h => `"${row[h] ?? ""}"`).join(","))
  ];
  return csv.join("\n");
}

const pivotedRows = pivotByDistrict(renamedRows);
const csvString = toCSV(pivotedRows);

// Step 4: Write CSV to disk
fs.writeFileSync("ancestry-merged-labeled.csv", csvString, "utf-8");
console.log("✅ ancestry-merged-labeled.csv has been written to disk.");
