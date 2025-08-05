const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 
const vars = [
"B27003_001E", // 	Total
"B27003_002E", // 	Male Total
"B27003_003E", // 	Male > Under 6 years
"B27003_004E", // 	Male > Under 6 years > with public insurance coverage
"B27003_005E", // 	Male > Under 6 years > no public insurance coverage
"B27003_006E", // 	Male > 6 to 18 years
"B27003_007E", // 	Male > 6 to 18 years > with public insurance coverage
"B27003_008E", // 	Male > 6 to 18 years > no public insurance coverage
"B27003_009E", // 	Male > 19 to 25 years
"B27003_010E", // 	Male > 19 to 25 years > with public insurance
"B27003_011E", // 	Male > 19 to 25 years > no public insurance coerage
"B27003_012E", // 	Male > 26 to 34 years
"B27003_013E", // 	Male > 26 to 34 years > with public insurance
"B27003_014E", // 	Male > 26 to 34 years > no public insurance
"B27003_015E", // 	Male > 35 to 44 years
"B27003_016E", // 	Male > 35 to 44 years > with public insurance
"B27003_017E", // 	Male > 35 to 44 years > no public insurance
"B27003_018E", // 	Male > 45 to 54 years
"B27003_019E", // 	Male > 45 to 54 years > with public insurance
"B27003_020E", // 	Male > 45 to 54 years > no public insurance
"B27003_021E", // 	Male > 55 to 64 years
"B27003_022E", // 	Male > 55 to 64 years > with public insurance
"B27003_023E", // 	Male > 55 to 64 years > no public insurance
"B27003_024E", // 	Male > 65 to 74 years
"B27003_025E", // 	Male > 65 to 74 years > with public insurance
"B27003_026E", // 	Male > 65 to 74 years > no public insurance
"B27003_027E", // 	Male > 75 years and over
"B27003_028E", // 	Male > 75 years and over > with public insurance
"B27003_029E", // 	Male > 75 years and over > no public insurance
"B27003_030E", // 	Female Total
"B27003_031E", // 	Female > Under 6 years
"B27003_032E", // 	Female > Under 6 years > with public insurance coverage
"B27003_033E", // 	Female > Under 6 years > no public insurance coverage
"B27003_034E", // 	Female > 6 to 18 years
"B27003_035E", // 	Female > 6 to 18 years > with public insurance coverage
"B27003_036E", // 	Female > 6 to 18 years > no public insurance coverage
"B27003_037E", // 	Female > 19 to 25 years
"B27003_038E", // 	Female > 19 to 25 years > with public insurance
"B27003_039E", // 	Female > 19 to 25 years > no public insurance coerage
"B27003_040E", // 	Female > 26 to 34 years
"B27003_041E", // 	Female > 26 to 34 years > with public insurance
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
    a.download = "public-insurance-part1.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 public insurance data";
    document.body.appendChild(a);
  });