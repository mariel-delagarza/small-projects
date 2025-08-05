const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = [
"B27001_047E", //	Female > 45 to 54 years > with health insurance
"B27001_048E", //	Female > 45 to 54 years > no health insurance
"B27001_049E", //	Female > 55 to 64 years
"B27001_050E", //	Female > 55 to 64 years > with health insurance
"B27001_051E", //	Female > 55 to 64 years > no health insurance
"B27001_052E", //	Female > 65 to 74 years
"B27001_053E", //	Female > 65 to 74 years > with health insurance
"B27001_054E", //	Female > 65 to 74 years > no health insurance
"B27001_055E", //	Female > 75 years and over
"B27001_056E", //	Female > 75 years and over > with health insurance
"B27001_057E", //	Female > 75 years and over > no health insurance
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
    a.download = "health-insurance-part2.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 health insurance data";
    document.body.appendChild(a);
  });