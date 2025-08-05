const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 
const vars = [
"C23001_001E", // Total
"C23001_002E", // Male Total
"C23001_003E", // Male > 16 to 19 years
"C23001_004E", // Male > 16 to 19 years > in labor force
"C23001_005E", // Male > 16 to 19 years > In labor force > Armed Forces
"C23001_006E", // Male > 16 to 19 years > In labor force > Civilian 
"C23001_007E", // Male > 16 to 19 years > In labor force > Civilian > Employed
"C23001_008E", // Male > 16 to 19 years > In labor force > Civilian > Unemployed
"C23001_009E", // Male > 16 to 19 years > Not in labor force
"C23001_010E", // Male > 20 to 24 years
"C23001_011E", // Male > 20 to 24 years > In labor force
"C23001_012E", // Male > 20 to 24 years > In labor force > Armed forces
"C23001_013E", // Male > 20 to 24 years > In labor force > Civilian
"C23001_014E", // Male > 20 to 24 years > In labor force > Civilian > Employed
"C23001_015E", // Male > 20 to 24 years > In labor force > Civilian > Unemployed
"C23001_016E", // Male > 20 to 24 years > Not in labor force
"C23001_017E", // Male > 25 to 44 years
"C23001_018E", // Male > 25 to 44 years > In labor force
"C23001_019E", // Male > 25 to 44 years > In labor force > Armed forces
"C23001_020E", // Male > 25 to 44 years > In labor force > Civilian
"C23001_021E", // Male > 25 to 44 years > In labor force > Civilian > Employed
"C23001_022E", // Male > 25 to 44 years > In labor force > Civilian > Unemployed
"C23001_023E", // Male > 25 to 44 years > Not in labor force
"C23001_024E", // Male > 45 to 54 years
"C23001_025E", // Male > 45 to 54 years > In labor force
"C23001_026E", // Male > 45 to 54 years > In labor force > Armed forces
"C23001_027E", // Male > 45 to 54 years > In labor force > Civilian
"C23001_028E", // Male > 45 to 54 years > In labor force > Civilian > Employed
"C23001_029E", // Male > 45 to 54 years > In labor force > Civilian > Unemployed
"C23001_030E", // Male > 45 to 54 years > Not in labor force
"C23001_031E", // Male > 55 to 64 years
"C23001_032E", // Male > 55 to 64 years > In labor force
"C23001_033E", // Male > 55 to 64 years > In labor force > Armed forces
"C23001_034E", // Male > 55 to 64 years > In labor force > Civilian
"C23001_035E", // Male > 55 to 64 years > In labor force > Civilian > Employed
"C23001_036E", // Male > 55 to 64 years > In labor force > Civilian > Unemployed
"C23001_037E", // Male > 55 to 64 years > Not in labor force
"C23001_038E", // Male > 65 to 74 years
"C23001_039E", // Male > 65 to 74 years > In labor force
"C23001_040E", // Male > 65 to 74  years > In labor force > employed
"C23001_041E", // Male > 65 to 74 years > In labor force > unemployed
"C23001_042E", // Male > 65 to 74 years > Not in labor force
"C23001_043E", // Male > 75 years and over
"C23001_044E", // Male > 75 years and over > in labor force
"C23001_045E", // Male > 75 years and over > in labor force > employed
"C23001_046E", // Male > 75 years and over > in labor force > unemployed
"C23001_047E", // Male > 75 years and over > not in labor force
"C23001_048E", // Female Total
"C23001_049E", // Female > 16 to 19 years
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
    a.download = "employment-status-part1.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 employment status data";
    document.body.appendChild(a);
  });