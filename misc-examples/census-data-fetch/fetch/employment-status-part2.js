const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 
const vars = [
"C23001_050E", //	Female > 16 to 19 years > in labor force
"C23001_051E", //	Female > 16 to 19 years > In labor force > Armed Forces
"C23001_052E", //	Female > 16 to 19 years > In labor force > Civilian 
"C23001_053E", //	Female > 16 to 19 years > In labor force > Civilian > Employed
"C23001_054E", //	Female > 16 to 19 years > In labor force > Civilian > Unemployed
"C23001_055E", //	Female > 16 to 19 years > Not in labor force
"C23001_056E", //	Female > 20 to 24 years
"C23001_057E", //	Female > 20 to 24 years > In labor force
"C23001_058E", //	Female > 20 to 24 years > In labor force > Armed forces
"C23001_059E", //	Female > 20 to 24 years > In labor force > Civilian
"C23001_060E", //	Female > 20 to 24 years > In labor force > Civilian > Employed
"C23001_061E", //	Female > 20 to 24 years > In labor force > Civilian > Unemployed
"C23001_062E", //	Female > 20 to 24 years > Not in labor force
"C23001_063E", //	Female > 25 to 44 years
"C23001_064E", //	Female > 25 to 44 years > In labor force
"C23001_065E", //	Female > 25 to 44 years > In labor force > Armed forces
"C23001_066E", //	Female > 25 to 44 years > In labor force > Civilian
"C23001_067E", //	Female > 25 to 44 years > In labor force > Civilian > Employed
"C23001_068E", //	Female > 25 to 44 years > In labor force > Civilian > Unemployed
"C23001_069E", //	Female > 25 to 44 years > Not in labor force
"C23001_070E", //	Female > 45 to 54 years
"C23001_071E", //	Female > 45 to 54 years > In labor force
"C23001_072E", //	Female > 45 to 54 years > In labor force > Armed forces
"C23001_073E", //	Female > 45 to 54 years > In labor force > Civilian
"C23001_074E", //	Female > 45 to 54 years > In labor force > Civilian > Employed
"C23001_075E", //	Female > 45 to 54 years > In labor force > Civilian > Unemployed
"C23001_076E", //	Female > 45 to 54 years > Not in labor force
"C23001_077E", //	Female > 55 to 64 years
"C23001_078E", //	Female > 55 to 64 years > In labor force
"C23001_079E", //	Female > 55 to 64 years > In labor force > Armed forces
"C23001_080E", //	Female > 55 to 64 years > In labor force > Civilian
"C23001_081E", //	Female > 55 to 64 years > In labor force > Civilian > Employed
"C23001_082E", //	Female > 55 to 64 years > In labor force > Civilian > Unemployed
"C23001_083E", //	Female > 55 to 64 years > Not in labor force
"C23001_084E", //	Female > 65 to 74 years
"C23001_085E", //	Female > 65 to 74 years > In labor force
"C23001_086E", //	Female > 65 to 74  years > In labor force > employed
"C23001_087E", //	Female > 65 to 74 years > In labor force > unemployed
"C23001_088E", //	Female > 65 to 74 years > Not in labor force
"C23001_089E", //	Female > 75 years and over
"C23001_090E", //	Female > 75 years and over > in labor force
"C23001_091E", //	Female > 75 years and over > in labor force > employed
"C23001_092E", //	Female > 75 years and over > in labor force > unemployed
"C23001_093E", //	Female > 75 years and over > not in labor force
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
    a.download = "employment-status-part2.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 employment status data";
    document.body.appendChild(a);
  });