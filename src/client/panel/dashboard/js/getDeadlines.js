function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

week = ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنج شنبه","جمعه","شنبه"];
date = new Date();
today = date.getDay();

$(document).ready(() => {
  for (i = 1; i < 8; i++) {
    $(`#deadlines-${i}`).text(week[(today + i - 1) % 7] == week[today]? 'امروز' : week[(today + i - 1) % 7]);
  }

  $.post('/api/getDeadlines', {user_token: token}, (data) => {
    /**
       TODO: Get deadlines and add them to the list items or show nothing if there is not any deadline on that day.
       Do not forget multiple deadlined days and not showing self deadlines (tasks)
    **/
  });
});
