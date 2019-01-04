var date = new Date();
let gy = date.getFullYear();
let gm = date.getMonth() + 1;
let gd = date.getDate();
var today = gregorian_to_jalali(gy,gm,gd);
today = `${today[0]}/${today[1]}/${today[2]}`;

function check_tasks(id) {
  $.post('/api/deleteDeadline', {user_token: token, id: id}, (data) => {
    if (data.res == 'ok') {
      $(`#task-${id}`).fadeOut('fast', () => {
        $(`#task-${id}`).remove();
        if ($(".tasks-li").length == 0) {
          $("#not_tasks").fadeIn('fast');
        }
      });
    }
  });
}
function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

var token = getCookie('token');

$(document).ready(() => {
  function date_error(){
    $("#task-date-picker").css('background-color', '#900e0e');
    let id = setInterval(() => {
      $("#task-date-picker").css('background-color', '#43015b');
      clearInterval(id);
    }, 1000);
  }


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

          if (!passed && task.deadline == today) {
            let element = `
            <li class="tasks-li" id="task-${id}">
              <div id="tasks-span-div">
                <span class="tasks-span">${text}</span>
              </div>
              <button onClick="check_tasks(${id})" class="tasks-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="task-${id}-button">
                <i class="material-icons">check</i>
              </button>
            </li>
            `;
            $("#tasks-ul").append(element);
          } else {
            continue;
          }
        }
      }
    });
   return false;
  }

  get_tasks();

  var tasks_status = $("#not_tasks").css('display') == 'none' ? true : false;

  $("#add-task").click(() => {

    if ($("#not_tasks").css('display') == 'block') {
      $("#not_tasks").fadeOut('fast', () => {
        $("#add-task-div").fadeIn('fast');
      });
    } else {
      $("#tasks-view").fadeOut('fast', () => {
        $("#add-task-div").fadeIn('fast');
      });
    }
    $("#add-task").fadeOut('fast', () => {
      $("#ok-task").fadeIn('fast');
      $("#cancel-task").fadeIn('fast');
    });
  });


  $("#task-date-picker").attr("value", today);

  $("#cancel-task").click(() => {
    $("#ok-task").fadeOut('fast');
    $("#cancel-task").fadeOut('fast');

    $("#add-task-div").fadeOut('fast', () => {
      if ($('.tasks-li').length == 0) $("#not_tasks").fadeIn('fast');
      else $("#tasks-view").fadeIn('fast');
    });

    $("#add-task").fadeIn('fast');
  });

  $("#ok-task").click(() => {
    if ($("#task-input").val().length > 0) {
      let selected_date = $("#task-date-picker").val().split('/');
      let year = selected_date[0];
      let month = selected_date[1];
      let day = selected_date[2];
      td = String(today).split('/');

      if (Number(year) < Number(td[0])) {
        date_error();
      } else if (Number(year) == Number(td[0]) && Number(month) < Number(td[1])) {
        date_error();
      } else if (Number(year) == Number(td[0]) && Number(month) == Number(td[1]) && Number(day) < Number(td[2])) {
        date_error();
      } else {
        // the selected date is not in the past
        // everything is fine :D lets send it to the API service!
        var task_text = $("#task-input").val();
        let task_date = $("#task-date-picker").val();
        let task_team = $("#task-type option:selected").val();
        $.post('/api/addDeadline', {user_token: token, task: true, text: task_text, expire_date: task_date, team: task_team}, (result) => {
          if (result.res == 'Added') {
            alert("با موفقیت اضافه شد");
            $("#ok-task").fadeOut('fast');
            $("#cancel-task").fadeOut('fast');
            $("#add-task-div").fadeOut('fast', () => {
              get_tasks();
              $("#tasks-view").fadeIn('fast');
            });
            $("#add-task").fadeIn('fast');
          }
        });
      }
    } else {
      $("#task-input").css('background-color', '#900e0e');
      let id = setInterval(() => {
        $("#task-input").css('background-color', '#43015b');
        clearInterval(id);
      }, 1000);
    }

  });
});
