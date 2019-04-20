function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

week = ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنج شنبه","جمعه","شنبه"];

$(document).ready(() => {
  for (i = 1; i < 8; i++) {
    var date = new Date();
    var today = date.getDay() - 1;
    $(`#deadlines-${i}`).text(i == 1 ? 'امروز' : week[(today + i) % 7]);
  }

<<<<<<< HEAD
  function get_tasks() {
    $.post('/api/getDeadlines', {user_token: token}, (data) => {
      $(".tasks-li").remove();
      if (data.res == "you do not have any deadlines.") {
        $("#not_tasks").css('display','block');
      } else if (data.deadlines && data.deadlines.length > 0) {
        let tasks = data.deadlines;
        for (let i = 0; i < tasks.length; i++) {
          // each of variables below are related to one task
          let task = tasks[i];
          let text = task.text;
          let passed = (task.passed == "true");
          let id = task.id;

          if (!passed) {
            let element = `
            <li class="tasks-li" id="task-${id}">
              <div id="tasks-span-div">
                <span class="tasks-span">${text}</span>
              </div>
              <button class="tasks-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="task-${id}-button">
                <i class="material-icons">check</i>
              </button>
            </li>
            `;
            $("#tasks-ul").append(element);
          } else {
            continue;
          }
=======
  $.post('/api/getSevenDaysDeadlines', {user_token: token}, (data) => {
    console.log(data);

    let weekdays = [[],[],[],[],[],[],[]];

    if (data.res == 'ok') {
      var deadlines = data.deadlines;
      for (i = 0; i < deadlines.length; i++) {
        let deadline = deadlines[i].deadline;
        let deadline_details = deadlines[i];
        deadline = deadline.split('/')[2];
        weekdays[deadline % 7].push(deadline_details);
      }
      // weekdays[0] => yekshanbe, 1 => 2shanbe , ...
      var date = new Date();
      var today = date.getDay();

      for (let i = 0; i < 7; i++) {
        if (weekdays[(today + i) % 7].length == 0) {
          $(`#deadline-circle-border-${1 + i}`).css('border-color', '#479c2c');
          $(`#deadline-circle-body-${1 + i}`).css('background', '#479c2c');
>>>>>>> user-panel
        }
      }

<<<<<<< HEAD
  $("#add-task").click(() => {

    if (!tasks_status) {
      $("#not_tasks").fadeOut('fast', () => {
        $("#add-task-div").fadeIn('fast');
      });
    } else {
      $("#tasks-view").fadeOut('fast', () => {
        $("#add-task-div").fadeIn('fast');
=======
      $("#deadline-1").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[today % 7];
        if (day_deadlines.length == 0) {
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-1").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
        });
>>>>>>> user-panel
      });

<<<<<<< HEAD
  var date = new Date();
  let gy = date.getFullYear();
  let gm = date.getMonth() + 1;
  let gd = date.getDate();
  var today = gregorian_to_jalali(gy,gm,gd);
  today = `${today[0]}/${today[1]}/${today[2]}`;
=======
      $("#deadline-2").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 1) % 7];
        if (day_deadlines.length == 0) {
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-2").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
        });
      });
>>>>>>> user-panel

      $("#deadline-3").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 2) % 7];
        if (day_deadlines.length == 0) {
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-3").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
        });
      });

      $("#deadline-4").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 3) % 7];
        if (day_deadlines.length == 0) {
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-4").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
        });
      });

<<<<<<< HEAD
    $("#add-task-div").fadeOut('fast', () => {
      if (!tasks_status) $("#not_tasks").fadeIn('fast');
      else $("#tasks-view").fadeIn('fast');
    });
=======
      $("#deadline-5").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 4) % 7];
        if (day_deadlines.length == 0) {
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-5").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
        });
      });
>>>>>>> user-panel

      $("#deadline-6").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 5) % 7];
        if (day_deadlines.length == 0) {
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-6").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
        });
      });

      $("#deadline-7").hover(() => {
        $("#deadlines-view-ul").empty();
        //it's today
        var day_deadlines = weekdays[(today + 6) % 7];
        if (day_deadlines.length == 0) {
          $('#free-deadlines').fadeIn('fast');
        } else {
          for (let i = 0; i < day_deadlines.length; i++){
            let deadline = `
              <li class="deadline-views-li">
              ${day_deadlines[i].text}
              </li>
            `;
            $('#deadlines-view-ul').append(deadline);
          }
          $("#show_deadlines").fadeIn('fast');
        }
        $("#deadline-7").mouseleave(() => {
          $("#show_deadlines").fadeOut('fast');
          $('#free-deadlines').fadeOut('fast');
        });
      });


    } else {
      $(".deadlines-li-circle").css('background', '#479c2c');
      $(".deadlines-circle").css('border-color', '#479c2c');
    }
  });
});
