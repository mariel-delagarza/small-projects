const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = ["B04006_001E", // Total population
"B04006_002E", // Afghan
"B04006_003E", // Albanian
"B04006_004E", // Alastian
"B04006_005E", // American
"B04006_006E", // Arab
"B04006_007E", // Arab > Egyptian
"B04006_008E", // Arab > Iraqi
"B04006_009E", // Arab > Jordanian
"B04006_010E", // Arab > Lebanese
"B04006_011E", // Arab > Moroccan
"B04006_012E", // Arab > Palestinian
"B04006_013E", // Arab > Syrian
"B04006_014E", // Arab > Arab
"B04006_015E", // Arab > Other Arab
"B04006_016E", // Armenian
"B04006_017E", // Assyrian/Chaldean/Syriac
"B04006_018E", // Australian
"B04006_019E", // Austrian
"B04006_020E", // Basque
"B04006_021E", // Belgian
"B04006_022E", // Brazilian
"B04006_023E", // British
"B04006_024E", // Bulgarian 
"B04006_025E", // Cajun
"B04006_026E", // Canadian
"B04006_027E", // Carpatho Rusyn 
"B04006_028E", // Celtic 
"B04006_029E", // Croatian
"B04006_030E", // Cypriot
"B04006_031E", // Czech
"B04006_032E", // Czechoslovakian 
"B04006_033E", // Danish
"B04006_034E", // Dutch
"B04006_035E", // Eastern European
"B04006_036E", // English
"B04006_037E", // Estonian
"B04006_038E", // European
"B04006_039E", // Finnish
"B04006_040E", // French (except Basque)
"B04006_041E", // French Canadian
"B04006_042E", // German
"B04006_043E", // German Russian
"B04006_044E", // Greek 
"B04006_045E", // Guyanese
"B04006_046E", // Hungarian
"B04006_047E", // Icelander
"B04006_048E", // Iranian
];

const url = `https://api.census.gov/data/2023/acs/acs5?get=NAME,${vars.join(",")}&for=congressional district:*&key=${apiKey}`;

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
    a.download = "ancestry-part1.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 ancestry data";
    document.body.appendChild(a);
  });