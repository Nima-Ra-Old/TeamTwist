$(document).ready( () => {

  $("#menu-button").click( () => {
    var display = $("#right-menu").css('display') == 'block' ? 'none' : 'block';
    $("#right-menu").css('display', display);
  });

});
