$(document).ready(() => {
  $("#add-team-button").click(() => {
    if ($("#add-team-button i").attr('class') == 'fas fa-plus') {
      $("#add-team-box").css('display', 'block');
      $("#add-team-button i").attr('class', 'fas fa-times');
      $("#team-notfound").css('display', 'none');
    } else {
      $("#add-team-box").css('display', 'none');
      $("#add-team-button i").attr('class', 'fas fa-plus');
    }
  });
});
