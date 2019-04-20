function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token') ? getCookie('token') : null;

$(document).ready(() => {

  if (token) {
    $("#top-login").text('پنل');
    $("#login-a").attr('href', '/panel');
    $("#top-signup").css('visibility', 'hidden');
  }

  if ($( window ).width() < 768){
    setInterval(() => {
      $("#scroll-down").fadeToggle('slow', "linear");
    }, 500);

    $(".top-slider").remove();
    $('.top-auth-li').attr('class', '');
    var cnt = $("#abilities-tablet-group1").contents();
    $("#abilities-tablet-group1").replaceWith(cnt);
    var cnt = $("#abilities-tablet-group2").contents();
    $("#abilities-tablet-group2").replaceWith(cnt);
    }

  if ($(window).width() > 768) {
    var cnt = $("#abilities-tablet-group1").contents();
    $("#abilities-tablet-group1").replaceWith(cnt);
    var cnt = $("#abilities-tablet-group2").contents();
    $("#abilities-tablet-group2").replaceWith(cnt);
  }
  $("#responsive-bar").click(() => {
    let classNames = $(".top-li").attr('class');

    if (classNames.split(' ')[1] == 'top-li-responsive') {
      $("#top-qoute").css('display', 'block');
      $(".top-li").attr('class', 'top-li');

    } else if (classNames == 'top-li') {
      $("#top-qoute").css('display', 'none');
      $(".top-li").addClass('top-li-responsive');
    }
  });

});
