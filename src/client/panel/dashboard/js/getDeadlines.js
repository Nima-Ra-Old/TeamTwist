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
    /**
       TODO: Get deadlines and add them to the list items or show nothing if there is not any deadline on that day.
       Do not forget multiple deadlined days
    **/

    let weekdays = [[],[],[],[],[],[],[]];

    if (data.res == 'ok') {
      var deadlines = data.deadlines;
      for (i = 0; i < deadlines.length; i++) {
        let deadline = deadlines[i].deadline;
        let deadline_details = deadlines[i];
        deadline = deadline.split('/')[2];
        weekdays[deadline % 7] += deadline_details;
      }
      // weekdays[0] => yekshanbe, 1 => 2shanbe , ...
      var date = new Date();
      var today = date.getDay();

      $("#deadline-1").hover(() => {
        if (weekdays[today][0]) {
          // show deadlines
        } else {
          $("#free-deadlines").fadeIn('fast', () => {
            $("#deadlines-1").mouseleave(() => {
              $("#free-deadlines").fadeOut('fast');
            });
          });
        }
      });

    }
  });
});
