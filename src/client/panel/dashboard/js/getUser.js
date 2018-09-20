function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

$(document).ready( () => {
  $.post('/api/getUser', {user_token: token}, (data) => {

    if (data.profilePic){
      $("#top-user-img").attr('src', `/api/photos?profilePic=${data.profilePic}`);
      $("#profile-img").attr('src', `/api/photos?profilePic=${data.profilePic}`);
    }
    else {
      $("#top-user-img").attr('src', `/panel/dashboard/img/person.png`);
      $("#profile-img").attr('src', `/panel/dashboard/img/person.png`);
    }

    $("#account-username-content").text(data.username);
    $("#account-followers-count").text(data.followers);
    $("#account-following-count").text(data.following);
  });
});
