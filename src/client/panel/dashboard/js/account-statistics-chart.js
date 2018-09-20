$(function() {
  Highcharts.chart('account-tasks', {
    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },

    title: {
      text: 'فعالیت شما'
    },

    xAxis: {
      categories: ['Alexander']
    },
    yAxis: {
      categories: ['Today', 'f', 'fffd'],
      title: null
    },
    colorAxis: {
      min:0,
      minColor: '#f3f3f3',
      maxColor: '#000'
    },
    legend: {
      align: 'right',
      layout: 'horizontal',
    },

    tooltip: {
      formatter: function () {
              return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                  this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
          }
    },
    series: [{
          name: 'Sales per employee',
          borderWidth: 1,
          data: [[0, 0, 10], [0,2,8]],
          dataLabels: {
              enabled: true,
              color: '#000000'
          }
      }]
  })
});
