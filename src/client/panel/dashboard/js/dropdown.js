$(document).ready(() => {
  var dropdown = false;
  $("#top-user").click(() => {
    if (dropdown) {
      $("#account-dropdown-menu").css('visibility', 'hidden');
      dropdown = false;
    } else {
      $("#account-dropdown-menu").css('visibility', 'visible');
      dropdown = true;
    }
  });
});
