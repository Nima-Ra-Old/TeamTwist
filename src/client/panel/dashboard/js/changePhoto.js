$(document).ready(() => {

  $("#profile-photo").hover(() => {
    $("#profile-img").css('opacity', '0.5');
    $("#change-photo").css('display', 'block');
  });

  $("#profile-photo").mouseleave(() => {
    $("#profile-img").css('opacity', '1');
    $("#change-photo").css('display', 'none');
  });

  $("#profile-photo").click(() => {
    window.location= '/' + 'settings';
  });

});
