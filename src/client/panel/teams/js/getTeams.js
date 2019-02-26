function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

$(document).ready( () => {
  function getTeams(){
    $.post('/api/getTeams', {user_token: token}, (data) => {
      if (data.length == 0) {
        $("#team-notfound").css('display', 'block');
      } else {
        for (let i = 0; i < data.length; i++) {
            var element = `
            <li class="teams-list-li">
              <img src="/api/photos?teamPic=${data[i].picture}">
            </li>`
            $("#teams-list-ul").append(element);
        }
        $("#teams-list").css('display', 'block');
      }
    });
  }
  getTeams();
});
