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
      for (var i = 0; i < data.length; i++) {
        let element = `
        <li class="account-teams-li">
          <span class="account-teams-name">${data[i].name}</span>
          <a class="account-teams-a">
            <img class="account-teams-img" src="/api/photos?teamPic=${data[i].picture}">
          </a>
        </li>`;

        $("#account-teams-ul").append(element);
      }
    }
  });
});
