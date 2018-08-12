$(document).ready(function(){
  if ($(window).width() < 981) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '/emailValidation/responsive.css';
    head.appendChild(link);

    var element = document.getElementsByClassName("container")[0];
    element.remove();

    var span = document.createElement("span");
    span.innerHTML = "یک ایمیل حاوی لینک فعالسازی برای شما ارسال شد. لطفا ایمیل خود را تایید کنید";
    var button = document.createElement("button");
    button.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent button";
    button.innerHTML = "اکانت دیگری دارید؟ وارد شوید";
    var element = document.getElementById("responsive");
    element.appendChild(button);
    element.setAttribute('href', '/login');
  }
});
