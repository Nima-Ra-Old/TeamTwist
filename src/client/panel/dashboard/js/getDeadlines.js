function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

week = ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنج شنبه","جمعه","شنبه"];

$(document).ready(() => {
  for (i = 1; i < 8; i++) {
    var date = new Date();
    var today = date.getDay() - 1;
    $(`#deadlines-${i}`).text(i == 1 ? 'امروز' : week[(today + i) % 7]);
  }

  $.post('/api/getSevenDaysDeadlines', {user_token: token}, (data) => {

    let weekdays = [[],[],[],[],[],[],[]];

    if (data.res == 'ok') {
      var deadlines = data.deadlines;
      for (i = 0; i < deadlines.length; i++) {
        let deadline = deadlines[i].deadline;
        let deadline_details = deadlines[i];
        deadline = deadline.split('/')[2];
        weekdays[deadline % 7].push(deadline_details);
      }
      // weekdays[0] => yekshanbe, 1 => 2shanbe , ...
      var date = new Date();
      var today = date.getDay();

      $("#deadline-1").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[today % 7];
        if (day_deadlines.length == 0) {
          $("#particles-js").fadeOut('fast');
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              <img src="/panel/dashboard/img/deadline.svg">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#particles-js").fadeOut('fast');
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-1").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
          $("#particles-js").fadeIn('fast');
        });
      });

      $("#deadline-2").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 1) % 7];
        if (day_deadlines.length == 0) {
          $("#particles-js").fadeOut('fast');
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              <img src="/panel/dashboard/img/deadline.svg">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#particles-js").fadeOut('fast');
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-2").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
          $("#particles-js").fadeIn('fast');
        });
      });

      $("#deadline-3").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 2) % 7];
        if (day_deadlines.length == 0) {
          $("#particles-js").fadeOut('fast');
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              <img src="/panel/dashboard/img/deadline.svg">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#particles-js").fadeOut('fast');
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-3").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
          $("#particles-js").fadeIn('fast');
        });
      });

      $("#deadline-4").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 3) % 7];
        if (day_deadlines.length == 0) {
          $("#particles-js").fadeOut('fast');
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              <img src="/panel/dashboard/img/deadline.svg">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#particles-js").fadeOut('fast');
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-4").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
          $("#particles-js").fadeIn('fast');
        });
      });

      $("#deadline-5").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 4) % 7];
        if (day_deadlines.length == 0) {
          $("#particles-js").fadeOut('fast');
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              <img src="/panel/dashboard/img/deadline.svg">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#particles-js").fadeOut('fast');
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-5").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
          $("#particles-js").fadeIn('fast');
        });
      });

      $("#deadline-6").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 5) % 7];
        if (day_deadlines.length == 0) {
          $("#particles-js").fadeOut('fast');
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              <img src="/panel/dashboard/img/deadline.svg">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#particles-js").fadeOut('fast');
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-6").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
          $("#particles-js").fadeIn('fast');
        });
      });

      $("#deadline-7").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 6) % 7];
        if (day_deadlines.length == 0) {
          $("#particles-js").fadeOut('fast');
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              <img src="/panel/dashboard/img/deadline.svg">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#particles-js").fadeOut('fast');
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-7").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
          $("#particles-js").fadeIn('fast');
        });
      });


    }
  });
});
