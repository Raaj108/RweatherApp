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
    console.log(services.graphData)
    services.generateGraph();
  }

  services.generateGraph = function () {
    var myChart = Highcharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Temperature Graph'
      },
      subtitle: {
        text: 'Displaying temperatures from ' + services.graphData.date[0] + ' to ' + services.graphData.date[services.graphData.date.length - 1]
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        categories: services.graphData.xData
      },
      yAxis: {
        title: {
          text: 'Temperature in °' + services.graphData.unit.toUpperCase()
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: -10,
        y: 100,
        borderWidth: 0
      },
      series: [{
        data: services.graphData.yData
        }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
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
