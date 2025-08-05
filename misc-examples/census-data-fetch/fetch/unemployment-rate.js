const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = [
  "S2301_C04_001E", //	Unemployment rate > Population 16 years and over
];

const url = `https://api.census.gov/data/2023/acs/acs1/subject?get=NAME,S2301_C04_001E&for=congressional district:*&key=${apiKey}`;


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
    a.download = "unemployment-rate.json"; // Name of file inside /data/2023
    a.textContent = "Download 2023 unemployment rate data";
    document.body.appendChild(a);
  });