const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = [
"B04006_049E", // Irish
"B04006_050E", // Israeli
"B04006_051E", // Italian
"B04006_052E", // Latvian
"B04006_053E", // Lithuanian 
"B04006_054E", // Luxembourger
"B04006_055E", // Macedonian
"B04006_056E", // Maltese
"B04006_057E", // New Zealander
"B04006_058E", // Northern European
"B04006_059E", // Norwegian
"B04006_060E", // Pennsylvania German
"B04006_061E", // Polish
"B04006_062E", // Portuguese
"B04006_063E", // Romanian
"B04006_064E", // Russian
"B04006_065E", // Scandinavian
"B04006_066E", // Scotch-Irish
"B04006_067E", // Scottish
"B04006_068E", // Serbian
"B04006_069E", // Slavic
"B04006_070E", // Slovak
"B04006_071E", // Slovene
"B04006_072E", // Soviet Union
"B04006_073E", // Subsaharan African
"B04006_074E", // Subsahran African > Cape Verdean
"B04006_075E", // Subsaharan African > Ethiopian
"B04006_076E", // Subsaharan African > Ghanaian
"B04006_077E", // Subsaharan African > Kenyan
"B04006_078E", // Subsaharan African > Liberian
"B04006_079E", // Subsaharan African > Nigerian
"B04006_080E", // Subsaharan African > Senegalese
"B04006_081E", // Subsaharan African > Sierra Leonean
"B04006_082E", // Subsaharan African > Somali
"B04006_083E", // Subsaharan African > South African
"B04006_084E", // Subsaharan African > Sudanese
"B04006_085E", // Subsaharan African > Ugandan
"B04006_086E", // Subsaharan African > Zimbabwean
"B04006_087E", // SubSaharan African > African
"B04006_088E", // SubSaharan African > Other Subsaharan African
"B04006_089E", // Swedish
"B04006_090E", // Swiss
"B04006_091E", // Turkish
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
    a.download = "ancestry.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 ancestry data";
    document.body.appendChild(a);
  });