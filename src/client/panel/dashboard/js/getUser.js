function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

$(document).ready( () => {
  $.post('/api/getUser', {user_token: token}, (data) => {

    if (data.profilePic){
      $("#top-user-img").attr('src', `/profile_photos?profilePic=${data.profilePic}`);
    }
    else {
      $("#top-user-img").attr('src', `/panel/dashboard/img/person.png`);
    }
  });
});
