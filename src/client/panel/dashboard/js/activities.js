Highcharts.chart('activities', {

    chart: {
        polar: true,
        type: 'line'

    },

    title: {
        text: 'فعالیت های شما'
    },

    xAxis: {
        categories: ['تیم ها', 'پروژه ها', 'پیشنهادها' , 'دوستان'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '<span class="activities-points">{point.y:,.0f}</span>'
        //pointFormat: '<span style="color:{series.color}" class="activities-series">{series.name}: <b class="activities-points">{point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'horizontal'
    },

    series: [{
        name: 'نمودار تعداد',
        data: [43000, 19000, 60000, 20000],
        pointPlacement: 'on'
    }]

});
