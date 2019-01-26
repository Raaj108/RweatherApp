weatherApp.factory('graphService', [function () {
  var services = {};

  services.graphData = {
    xData: [],
    yData: [],
    date: [],
    unit: ''
  };

  services.setGraphData = function (data) {
    for (i = 0; i < data.length; i++) {
      services.graphData.xData[i] = data[i].time;
      services.graphData.yData[i] = data[i].temp;
      if (services.graphData.date.indexOf(data[i].date) == -1) {
        services.graphData.date.push(data[i].date)
      }
    }
    services.graphData.unit = (data[0].tempUnit)    
    services.generateGraph();
  }

  services.generateGraph = function () {
    var myChart = Highcharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Temperature Graph for next 24 Hours'
      },
      subtitle: {
        text: 'Source: www.openweather.com'
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        categories: services.graphData.xData
      },
      yAxis: {
        title: {
          text: 'Temperature (°' + services.graphData.unit.toUpperCase() + ')'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      series: [{
        name: "Temperature",
        data: services.graphData.yData
        }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            },
            credits: {
              enabled: false
            }
          }
        }]
      }
    });
  }

  return services;
}])
