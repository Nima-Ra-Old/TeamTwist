$(document).ready( () => {

  $("#teams-img-1").hover( () => {
    $("#teams-img-1").css("filter", 'none');
  });

  $("#teams-img-2").hover( () => {
    $("#teams-img-2").css("filter", 'none');
  });

  $("#teams-img-3").hover( () => {
    $("#teams-img-3").css("filter", 'none');
  });

  $("#teams-img-4").hover( () => {
    $("#teams-img-4").css("filter", 'none');
  });

  $("#teams-img-1").on( "mouseleave", () => {
    $("#teams-img-1").css("filter", 'brightness(0) invert(1)');
  });

  $("#teams-img-2").on( "mouseleave", () => {
    $("#teams-img-2").css("filter", 'brightness(0) invert(1)');
  });

  $("#teams-img-3").on( "mouseleave", () => {
    $("#teams-img-3").css("filter", 'brightness(0) invert(1)');
  });

  $("#teams-img-4").on( "mouseleave", () => {
    $("#teams-img-4").css("filter", 'brightness(0) invert(1)');
  });

});
