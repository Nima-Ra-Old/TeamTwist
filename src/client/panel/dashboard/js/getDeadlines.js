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

  $.post('/api/getDeadlines', {user_token: token}, (data) => {

    if (data.res == "you do not have any deadlines.") {
      $("#not_tasks").css('display','block');
    }

  });

  $("#add-task").click(() => {
    $("#not_tasks").fadeOut('fast', () => {
      $("#add-task-div").fadeIn('fast');
    });
    $("#add-task").fadeOut('fast', () => {
      $("#ok-task").fadeIn('fast');
      $("#cancel-task").fadeIn('fast');
    });
  });

  var date = new Date();
  let gy = date.getFullYear();
  let gm = date.getMonth() + 1;
  let gd = date.getDate();
  var today = gregorian_to_jalali(gy,gm,gd);
  today = `${today[0]}/${today[1]}/${today[2]}`;

  $("#task-date-picker").attr("value", today);

  $("#cancel-task").click(() => {
    $("#ok-task").fadeOut('fast');
    $("#cancel-task").fadeOut('fast');
    $("#add-task-div").fadeOut('fast', () => {
      $("#not_tasks").fadeIn('fast');
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
              $("#not_tasks").fadeIn('fast');
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
