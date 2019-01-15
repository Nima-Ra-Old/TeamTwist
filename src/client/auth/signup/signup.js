function redirectPost(url, data) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;
    for (var name in data) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = data[name];
        form.appendChild(input);
    }
    form.submit();
}

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

  $("#submit").click(function() {
    let password1 = $("#pwd1").val();
    let password2 = $("#pwd2").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let phone = $("#phone").val();

    if (password1 == password2 && phone != '' && email != '' && username != ''){
        let signup_data = {
          username: username,
          email: email,
          password: password1,
          phone: phone
        }
        $.post(window.location.href.split('/signup')[0]+"/api/createUser", signup_data,  function(data) {
          if (data.reqStatus == 'done') {
            alert("ثبت نام شما با موفقیت انجام شد");
            window.location.replace(`${window.location.href.split('/signup')[0]}/verifyAccount`);
          }
          else {
            alert("یک حساب دیگر دارد از ایمیل، نام کاربری و یا شماره تلفن شما استفاده می‌کند.")
            window.location.replace(window.location.href);
          }
        });
      }
      else {
        alert("خطا:‌ مطمئن شوید که همه ورودی ها را پر کرده اید و رمز عبور شما با تکرار آن یکسان است");
      }

      return false;
  });
});
