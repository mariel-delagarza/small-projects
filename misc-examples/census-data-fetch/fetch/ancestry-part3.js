const apiKey = "6d5807b5e82e7172e5d2a46c63d233be14b236ab"; 

const vars = [
"B04006_092E", // Ukrainian
"B04006_093E", // Welsh
"B04006_094E", // West Indian (except Hispanic groups)
"B04006_095E", // West Indian > Bahamian
"B04006_096E", // West Indian > Barbadian
"B04006_097E", // West Indian > Belizean
"B04006_098E", // West Indian > Bermudan
"B04006_099E", // West Indian > British West Indian
"B04006_100E", // West Indian > Dutch West Indian 
"B04006_101E", // West Indian > Haitian
"B04006_102E", // West Indian > Jamaican
"B04006_103E", // West Indian > Trinidadian and Tobagonian
"B04006_104E", // West Indian > U.S. Virgin Islander
"B04006_105E", // West Indian > West Indian
"B04006_106E", // West Indian > Other West Indian
"B04006_107E", // Yugoslavian 
"B04006_108E", // Other groups 
"B04006_109E", // Unclassified or not reported
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