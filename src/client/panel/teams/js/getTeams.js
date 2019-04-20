function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

function openTeam(i) {
  window.location= '/team?' + i;
}

function persianTest(str) {
  var arabic = /[\u0600-\u06FF]/;
  var result = arabic.test(str);
  if (result == true) return true;
  else return false;
}

function deleteTeam(id) {
  $.post('/api/deleteTeam', {user_token: token, teamId: id}, (data) => {
    if (data.finalResult) {
      $("#team-"+id).fadeOut('fast');
      alert('تیم حذف شد');
    } else {
      alert('پیج را رفرش کنید و دوباره تلاش کنید');
    }
  });
}

function enableDeleting() {
  
}

function getTeams(){
  $.post('/api/getTeams', {user_token: token}, (data) => {
    if (data.length == 0) {
      $("#team-notfound").css('display', 'block');
    } else {
      $(".teams-list-li").remove();
      for (let i = 0; i < data.length; i++) {
        var teamName = data[i].name;
        var teamPictureId = data[i].picture;
        var teamId = data[i].id;
        var teamPicture = "/api/photos?teamPic="+teamPictureId;
        if (persianTest(teamName) == true) languageSettings = "style='font-family: yekan'";
        else languageSettings = '';
        var element = `
        <li id="team-${teamId}" class="teams-list-li" onClick="openTeam(${teamId})">
        <img src="/api/photos?teamPic=${teamPictureId}">
        <span ${languageSettings} class="teams-list-name">${teamName}</span>

        </li>
        `
        $("#teams-list-ul").append(element);
      }
      $("#teams-list").fadeIn('fast');
    }
  });
}

var token = getCookie('token');

$(document).ready( () => {
  getTeams();
});
