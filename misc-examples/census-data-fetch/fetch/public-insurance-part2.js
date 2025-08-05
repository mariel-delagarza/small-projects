const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 
const vars = [
"B27003_042E", //	Female > 26 to 34 years > no public insurance
"B27003_043E", //	Female > 35 to 44 years
"B27003_044E", //	Female > 35 to 44 years > with public insurance
"B27003_045E", //	Female > 35 to 44 years > no public insurance
"B27003_046E", //	Female > 45 to 54 years
"B27003_047E", //	Female > 45 to 54 years > with public insurance
"B27003_048E", //	Female > 45 to 54 years > no public insurance
"B27003_049E", //	Female > 55 to 64 years
"B27003_050E", //	Female > 55 to 64 years > with public insurance
"B27003_051E", //	Female > 55 to 64 years > no public insurance
"B27003_052E", //	Female > 65 to 74 years
"B27003_053E", //	Female > 65 to 74 years > with public insurance
"B27003_054E", //	Female > 65 to 74 years > no public insurance
"B27003_055E", //	Female > 75 years and over
"B27003_056E", //	Female > 75 years and over > with public insurance
"B27003_057E", //	Female > 75 years and over > no public insurance
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
    a.download = "public-insurance-part2.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 public insurance data";
    document.body.appendChild(a);
  });