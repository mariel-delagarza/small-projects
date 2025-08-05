const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 
const vars = [
"B15003_001E", //	Total
"B15003_002E", //	No schooling completed
"B15003_003E", //	Nursery School
"B15003_004E", //	Kindergarten
"B15003_005E", //	1st grade
"B15003_006E", //	2nd grade
"B15003_007E", //	3rd grade
"B15003_008E", //	4th grade
"B15003_009E", //	5th grade
"B15003_010E", //	6th grade
"B15003_011E", //	7th grade
"B15003_012E", //	8th grade
"B15003_013E", //	9th grade
"B15003_014E", //	10th grade
"B15003_015E", //	11th grade
"B15003_016E", //	12th grade, no diploma
"B15003_017E", //	Regular high school diploma
"B15003_018E", //	GED or alternative credential
"B15003_019E", //	Some college, less than 1 year
"B15003_020E", //	Some college, 1 or more years, no degree
"B15003_021E", //	Associate's degree
"B15003_022E", //	Bachelor's degree
"B15003_023E", //	Master's degree
"B15003_024E", //	Professional school degree
"B15003_025E", //	Doctorate degree
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
    a.download = "education.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 education data";
    document.body.appendChild(a);
  });