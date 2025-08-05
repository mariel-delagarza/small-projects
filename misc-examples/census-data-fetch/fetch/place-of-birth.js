const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = [
"B05002_001E",	// Total
"B05002_002E",	// Native Total
"B05002_013E",	// Foreign-born Total
"B05002_014E",	// Foreign-born > Naturalized U.S. Citizen
"B05002_015E",	// Foreign-born > Naturalized U.S. Citizen > Europe
"B05002_016E",	// Foreign-born > Naturalized U.S. Citizen > Asia
"B05002_017E",	// Foreign-born > Naturalized U.S. Citizen > Africa
"B05002_018E",	// Foreign-born > Naturalized U.S. Citizen > Oceania
"B05002_019E",	// Foreign-born > Naturalized U.S. Citizen > Latin America
"B05002_020E",	// Foreign-born > Naturalized U.S. Citizen > Northern America
"B05002_021E",	// Foreign-born > Not a U.S. Citizen
"B05002_022E",	// Foreign-born > Not a U.S. Citizen > Europe
"B05002_023E",	// Foreign-born > Not a U.S. Citizen > Europe > Asia
"B05002_024E",	// Foreign-born > Not a U.S. Citizen > Europe > Africa
"B05002_025E",	// Foreign-born > Not a U.S. Citizen > Europe > Oceania
"B05002_026E",	// Foreign-born > Not a U.S. Citizen > Europe > Latin America
"B05002_027E",	// Foreign-born > Not a U.S. Citizen > Europe > Northern America
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
    a.download = "place-of-birth.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 place of birth data";
    document.body.appendChild(a);
  });