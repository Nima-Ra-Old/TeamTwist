$(document).ready(() => {
  $.post('/api/getUser', {user_token: token}, (getUser) => {

    teams = getUser.teams;
    followers = getUser.followers;
    following = getUser.following;

    $.post('/api/getProjects', {user_token: token}, (getProjects) => {
      if (getProjects.projectsCount !== undefined){
        var data = [
              {
                className: 'الان', // optional can be used for styling
                axes: [
                  {axis: "دنبال کنندگان", value: followers},
                  {axis: "دنبال شوندگان", value: following},
                  {axis: "تیم ها", value: teams},
                  {axis: "پروژه ها", value: getProjects.projectsCount},
                  {axis: "پیشنهاد های کاری", value: 2}
                ]
              },
              {
                className: 'ماه قبل',
                axes: [
                  {axis: "دنبال کنندگان", value: 6},
                  {axis: "دنبال شوندگان", value: 7},
                  {axis: "تیم ها", value: 10},
                  {axis: "پروژه ها", value: 13},
                  {axis: "پیشنهاد های کاری", value: 9}
                ]
              }
            ];

            function randomDataset() {
              return data.map(function(d) {
                return {
                  className: d.className,
                  axes: d.axes.map(function(axis) {
                    return {axis: axis.axis, value: Math.ceil(Math.random() * 10)};
                  })
                };
              });
            }

            var chart = RadarChart.chart();
              var cfg = chart.config(); // retrieve default config
              var svg = d3.select('#radar-chart').append('svg')
                .attr('width', 300)
                .attr('height', 410);
              svg.append('g').classed('single', 1).datum(randomDataset()).call(chart);
              // many radars
              chart.config({w: cfg.w / 4, h: cfg.h / 4, axisText: false, levels: 0, circles: false});
              cfg = chart.config();
              function render() {
                var game = svg.selectAll('g.game').data(
                  [
                    randomDataset(),
                    randomDataset(),
                    randomDataset(),
                    randomDataset()
                  ]
                );
                game.enter().append('g').classed('game', 1);
                game
                  .attr('transform', function(d, i) { return 'translate('+(i * cfg.w)+','+ (cfg.h * 4) +')'; })
                  .call(chart);
                setTimeout(render, 1000);
              }
              render();

              RadarChart.defaultConfig.levelTick = true;
              RadarChart.draw("#radar-chart", data);

      }
    });




  });

});
