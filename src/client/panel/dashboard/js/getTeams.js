function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

$(document).ready( () => {
  $.post('/api/getTeams', {user_token: token}, (data) => {
    if (data.res == 'You have no team') {
      $("#team-notfound").css('display', 'block');
    } else {
      var items = data.length > 6 ? 6 : data.length;
      for (var i = 0; i < items; i++) {
        let element = `
        <li class="account-teams-li">
          <a class="account-teams-a">
            <img class="account-teams-img" src="/api/photos?teamPic=${data[i].picture}" alt="${data[i].name}">
          </a>
        </li>`;

        $("#account-teams-ul").append(element);

        let option = `
        <option class="task-type-option" value="${data[i].id}">${data[i].name}</option>
        `;
        $("#task-type").append(option);
      }
    }
  });
});
