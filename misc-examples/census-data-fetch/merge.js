const fs = require("fs");
const path = require("path");

// Read the three ancestry parts
const part1 = JSON.parse(fs.readFileSync(path.join(__dirname, "2023/ancestry-part1.json")));
const part2 = JSON.parse(fs.readFileSync(path.join(__dirname, "2023/ancestry-part2.json")));
const part3 = JSON.parse(fs.readFileSync(path.join(__dirname, "2023/ancestry-part3.json")));

// Read the variable label map
const variableLabels = JSON.parse(fs.readFileSync(path.join(__dirname, "census-bureau-variables.json")));

// FIPS → state abbreviation lookup
const stateAbbreviations = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY"
};

// Merge the data
function mergeParts(...parts) {
  const mergedMap = new Map();

  parts.flat().forEach((entry) => {
    const key = `${entry.state}-${entry["congressional district"]}`;

    if (!mergedMap.has(key)) {
      mergedMap.set(key, { ...entry });
    } else {
      Object.assign(mergedMap.get(key), entry);
    }
  });

  return Array.from(mergedMap.values());
}

const merged = mergeParts(part1, part2, part3);

// Replace coded variable keys with labels
const withLabeledKeys = merged.map(entry => {
  const labeledEntry = {};

  for (const key in entry) {
    if (["NAME", "state", "congressional district"].includes(key)) {
      labeledEntry[key] = entry[key];
    } else {
      const label = variableLabels[key];
      if (label) {
        labeledEntry[label] = entry[key];
      } else {
        labeledEntry[key] = entry[key]; // fallback for unknown keys
      }
    }
  }

  return labeledEntry;
});

// Add state-district field (AL-1, CA-13, etc.)
const withLabeledKeysAndDistrictCode = withLabeledKeys.map(entry => {
  const stateFIPS = entry.state;
  const district = entry["congressional district"];

  const abbrev = stateAbbreviations[stateFIPS] || stateFIPS;
  const label = `${abbrev}-${parseInt(district)}`; // remove leading zeros

  return {
    ...entry,
    "state-district": label
  };
});

// Save merged + labeled file
const outputPath = path.join(__dirname, "2023/ancestry-merge.json");
fs.writeFileSync(outputPath, JSON.stringify(withLabeledKeysAndDistrictCode, null, 2));
console.log(`✅ Merged file with labeled keys and district labels saved to ${outputPath}`);

// Step 1: Build list of unique variables (excluding metadata)
const variables = Object.keys(withLabeledKeysAndDistrictCode[0]).filter(
  key => !["NAME", "state", "congressional district", "state-district"].includes(key)
);

// Step 2: Build columns for the CSV
const districts = withLabeledKeysAndDistrictCode.map(d => d["state-district"]);

// Step 3: Build rows: each variable as a row
const rows = variables.map(variable => {
  const row = { Variable: variable };
  for (const entry of withLabeledKeysAndDistrictCode) {
    const district = entry["state-district"];
    row[district] = entry[variable] ?? "";
  }
  return row;
});

// Step 4: Convert to CSV
function toCSV(data) {
  const headers = ["Variable", ...districts];
  const lines = [
    headers.join(","),
    ...data.map(row =>
      headers.map(h => `"${row[h] ?? ""}"`).join(",")
    )
  ];
  return lines.join("\n");
}

const csvOutput = toCSV(rows);

// Step 5: Write CSV to disk
const csvPath = path.join(__dirname, "2023/ancestry-merge.csv");
fs.writeFileSync(csvPath, csvOutput, "utf-8");
console.log(`✅ Pivoted CSV saved to ${csvPath}`);
