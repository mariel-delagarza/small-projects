const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = [
"B27001_001E", //	Total
"B27001_002E", //	Male Total
"B27001_003E", //	Male > Under 6 years
"B27001_004E", //	Male > Under 6 years > with health insurance coverage
"B27001_005E", //	Male > Under 6 years > no health insurance coverage
"B27001_006E", //	Male > 6 to 18 years
"B27001_007E", //	Male > 6 to 18 years > with health insurance coverage
"B27001_008E", //	Male > 6 to 18 years > no health insurance coverage
"B27001_009E", //	Male > 19 to 25 years
"B27001_010E", //	Male > 19 to 25 years > with health insurance
"B27001_011E", //	Male > 19 to 25 years > no health insurance coerage
"B27001_012E", //	Male > 26 to 34 years
"B27001_013E", //	Male > 26 to 34 years > with health insurance
"B27001_014E", //	Male > 26 to 34 years > no health insurance
"B27001_015E", //	Male > 35 to 44 years
"B27001_016E", //	Male > 35 to 44 years > with health insurance
"B27001_017E", //	Male > 35 to 44 years > no health insurance
"B27001_018E", //	Male > 45 to 54 years
"B27001_019E", //	Male > 45 to 54 years > with health insurance
"B27001_020E", //	Male > 45 to 54 years > no health insurance
"B27001_021E", //	Male > 55 to 64 years
"B27001_022E", //	Male > 55 to 64 years > with health insurance
"B27001_023E", //	Male > 55 to 64 years > no health insurance
"B27001_024E", //	Male > 65 to 74 years
"B27001_025E", //	Male > 65 to 74 years > with health insurance
"B27001_026E", //	Male > 65 to 74 years > no health insurance
"B27001_027E", //	Male > 75 years and over
"B27001_028E", //	Male > 75 years and over > with health insurance
"B27001_029E", //	Male > 75 years and over > no health insurance
"B27001_030E", //	Female Total
"B27001_031E", //	Female > Under 6 years
"B27001_032E", //	Female > Under 6 years > with health insurance coverage
"B27001_033E", //	Female > Under 6 years > no health insurance coverage
"B27001_034E", //	Female > 6 to 18 years
"B27001_035E", //	Female > 6 to 18 years > with health insurance coverage
"B27001_036E", //	Female > 6 to 18 years > no health insurance coverage
"B27001_037E", //	Female > 19 to 25 years
"B27001_038E", //	Female > 19 to 25 years > with health insurance
"B27001_039E", //	Female > 19 to 25 years > no health insurance coerage
"B27001_040E", //	Female > 26 to 34 years
"B27001_041E", //	Female > 26 to 34 years > with health insurance
"B27001_042E", //	Female > 26 to 34 years > no health insurance
"B27001_043E", //	Female > 35 to 44 years
"B27001_044E", //	Female > 35 to 44 years > with health insurance
"B27001_045E", //	Female > 35 to 44 years > no health insurance
"B27001_046E", //	Female > 45 to 54 years
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
    a.download = "health-insurance-part1.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 health insurance data";
    document.body.appendChild(a);
  });