$(document).ready(() => {
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
