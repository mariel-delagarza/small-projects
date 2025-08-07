Highcharts.chart("big-chart", {
  title: {
    text: "Big Title",
    align: "left",
  },
  legend: {
    enabled: false,
  },
  subtitle: {
    text: "Subtitle",
    align: "left",
  },

  yAxis: {
    title: {
      text: "",
    },
  },

  xAxis: {
    accessibility: {
      rangeDescription: "Range: 2010 to 2022",
    },
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },

  series: [
    {
      name: "",
      data: [40, 48, 65, 82, 33, 28, 67],
    },
  ],

  credits: {
    enabled: false,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
});
