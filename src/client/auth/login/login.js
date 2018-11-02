$(document).ready(function() {
  if ($(window).width() < 981) {
    $("#hr").remove();

    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '/auth/login/responsive.css';
    head.appendChild(link);
  } else {
    var element = document.getElementById('login-forms');
    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    $(".inputs").css("width" , width);
  }

  $("#submit").click(function(){
    var email = $("#email").val();
    var pwd = $("#pwd").val();
    $.post(window.location.href+"/login", {email: email, password: pwd}, (data) => {
      if (data.reqStatus == 'failed') {
        alert("کاربر یافت نشد. مطمئن شوید که ورودی ها را صحیح پر کرده اید و اکانت شما تایید شده است.");
        window.location.reload();
      } else {
        window.location=window.location.href.split('/login')[0]+'/panel';
      }
    });
    return false;
  });
});
