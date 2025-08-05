const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = [
"B18101_001E", // 	Total
"B18101_002E",	// Male Total
"B18101_003E",	// Male > Under 5 Years
"B18101_004E",	// Male > Under 5 Years > With a disability
"B18101_005E",	// Male > Under 5 Years > No disability
"B18101_006E",	// Male > 5 to 17 years 
"B18101_007E",	// Male > 5 to 17 years > With a disability
"B18101_008E",	// Male > 5 to 17 years > No disability
"B18101_009E",	// Male > 18 to 34 years
"B18101_010E",	// Male > 18 to 34 years > with a disability
"B18101_011E",	// Male > 18 to 34 years > No disability
"B18101_012E",	// Male > 35 to 64 years
"B18101_013E",	// Male > 35 to 64 years > with a disability
"B18101_014E",	// Male > 35 to 64 years > no disability
"B18101_015E",	// Male > 65 to 74 years 
"B18101_016E",	// Male > 65 to 74 years > with a disability
"B18101_017E",	// Male > 65 to 74 years > no disability
"B18101_018E",	// Male > 75 years and over
"B18101_019E",	// Male > 75 years and over > with a disability
"B18101_020E",	// Male > 75 years and over > no disability
"B18101_021E",	// Female Total
"B18101_022E",	// Female > Under 5 years
"B18101_023E",	// Female  > Under 5 years > with a disability
"B18101_024E",	// Female > Under 5 years > no disability
"B18101_025E",	// Female > 5 to 17 years
"B18101_026E",	// Female > 5 to 17 years > with a disability
"B18101_027E",	// Female > 5 to 17 years > no disability
"B18101_028E",	// Female > 18 to 34 years
"B18101_029E",	// Female > 18 to 34 years > with a disability
"B18101_030E",	// Female > 18 to 34 years > no disability
"B18101_031E",	// Female > 35 to 64 years 
"B18101_032E",	// Female > 35 to 64 years > with a disability
"B18101_033E",	// Female > 35 to 64 years > no disability
"B18101_034E",	// Female > 65 to 74 years
"B18101_035E",	// Female > 65 to 74 years > with a disability
"B18101_036E",	// Female > 65 to 74 years > no disability
"B18101_037E",	// Female > 75 years and over
"B18101_038E",	// Female > 75 years and over > with a disability
"B18101_039E",	// Female > 75 years and over > no disability
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
    a.download = "disability.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 disability data";
    document.body.appendChild(a);
  });