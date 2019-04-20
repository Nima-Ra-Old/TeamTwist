$(document).ready(function(){
  if ($(window).width() < 981) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '/verify/responsive.css';
    head.appendChild(link);

    var element = document.getElementsByClassName("container")[0];
    element.remove();

    var button = document.createElement("button");
    button.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent button";
    button.innerHTML = "آغاز به کار کنید!";
    var element = document.getElementById("responsive");
    element.appendChild(button);
    element.setAttribute('href', '/login');
  }
});
