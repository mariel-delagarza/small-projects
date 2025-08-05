const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 
const vars = [
"C22001_001E",	// Total
"C22001_002E",	// Household received Food Stamps/SNAP in the past 12 months
"C22001_003E",	// Household did not receive Food Stamps/SNAP in the past 12 months
"B19013_001E",	// Median Household Income in the Past 12 Months (in 2023 Inflation-Adjusted Dollars)
"B17001_001E",	// Total
"B17001_002E",	// Income in the past 12 months below poverty level (total)
"B17001_031E",	// Income in the past 12 months at or above poverty level (total)
"B19058_001E",	// Total
"B19058_002E",	// With cash public assistance or Food Stamps/SNAP
"B19058_003E",	// No cash public assistance or Food Stamps/SNAP
];

const url = `https://api.census.gov/data/2023/acs/acs1?get=NAME,${vars.join(",")}&for=congressional district:*&key=${apiKey}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const headers = data[0];
    const rows = data.slice(1).map((row) =>
      Object.fromEntries(headers.map((h, i) => [h, row[i]]))
    );

    const blob = new Blob([JSON.stringify(rows, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "income-and-assistance.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 income and assistance data";
    document.body.appendChild(a);
  });