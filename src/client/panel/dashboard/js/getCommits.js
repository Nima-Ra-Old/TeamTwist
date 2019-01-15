function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

$(document).ready( () => {
  $.post('/api/getTeams', {user_token: token}, (data) => {
    if (data.res == 'You have no team') {

    } else {
      var teams = [];
      for (i = 0; i < data.length; i++){teams += data[i].name};
      $.post('/api/getCommits', {user_token: token , teams: teams}, (data) => {

      });
    }
  });
});
