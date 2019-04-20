function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

$(document).ready(() => {
  $('#user-logout').click(() => {
    $.post('/api/revokeToken', {token: token}, (data) => {
      if (data.reqStatus == 'done'){
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location='/';
      }
    });
  });
});
