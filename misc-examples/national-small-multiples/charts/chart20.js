Highcharts.chart("chart20", {
  title: {
    text: 'TN',
    align: "left",
    style: {
      fontSize: '14px',
      color: '#000'
    }
  },
  chart: {
    backgroundColor: '#fff'
  },
  credits: {
    enabled: false
  },
  subtitle: {
    text: '',
    align: "left",
  },
  yAxis: {
    visible: false
  },
  xAxis: {
    visible: false
  },
  legend: {
    enabled: false
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
      name: "Installation & Developers",
      data: [
        43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
        161454, 154610, 168960, 171558,
      ],
    },
  ]
});