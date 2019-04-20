function showMenu() {
    var x = document.getElementById("Topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


$(document).ready(function(){
  $("#home").hover(function(){
    $("#pic_img").attr("src", "API/img/home.png");
  });
  $("#samples").hover(function(){
    $("#pic_img").attr("src", "API/img/code.png");
  });
  $("#introduce").hover(function(){
    $("#pic_img").attr("src", "API/img/statistics.png");
  });
  $("#contact").hover(function(){
    $("#pic_img").attr("src", "API/img/phone.png");
  });


  $("#home").mouseleave(function(){
    $("#pic_img").attr("src", "API/img/api.png");
  });
  $("#samples").mouseleave(function(){
    $("#pic_img").attr("src", "API/img/api.png");
  });
  $("#introduce").mouseleave(function(){
    $("#pic_img").attr("src", "API/img/api.png");
  });
  $("#contact").mouseleave(function(){
    $("#pic_img").attr("src", "API/img/api.png");
  });
  if ($(window).width() > 768) {
    $(".icon").css("display","none");
  }
});
