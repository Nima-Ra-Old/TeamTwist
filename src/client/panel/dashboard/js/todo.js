function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

function updateTodos() {
  $.post('/api/getTodos', {user_token: token}, (data) => {

    if (data.res == 'Ok') {
      let todoLength = data.todo.length > 10 ? 10 : data.todo.length;
      for (var i = 0; i < data.todo.length; i++) {
        if ($("#todo-"+data.todo[i].id).length == 0 ){
          let todo_val = data.todo[i].todo.length > 27 ? data.todo[i].todo.substr(0, 27) + '...' : data.todo[i].todo;
          let todo_element =
          `<li class="todos-li" id="todo-${data.todo[i].id}">
            <span class="todos-span"><span class="ordinary">${$(".todos-li").length + 1}.</span> ${todo_val}</span>
            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onClick="checkTodo(${data.todo[i].id})">
              <i class="material-icons">check</i>
            </button>
          </li>`;
          $("#todos-ul").append(todo_element);
        }
      }

    } else if (data.res == '404') {
      $("#todos-ul").css('display', 'none');
      $("#add-todo-always").css('display', 'none');
      $("#add-todo").css('display', 'block');
    }

  });
}

function checkTodo(i) {
  var todo_id = "#todo-"+i;

  $.post('/api/deleteTodo', {user_token: token , todo_id: i}, (data) => {
    let result = data.res;

    if (result == 'deleted') {

      $(todo_id).fadeOut('fast', () => {
        $(todo_id).remove();

        if ($(".todos-li").length == 0) {
          $("#todos-ul").css('display', 'none');
          $("#add-todo-always").css('display', 'none');
          $("#add-todo").css('display', 'block');
        } else {

          for (var j = 0; j < $(".todos-li").length; j++) {
            if ($(".todos-li").eq(j).attr('id').split('todo-')[1] > i) {
              let number = Number($(".ordinary").eq(j).text().split('.')[0]) - 1;
              $(".ordinary").eq(j).text(number + '.');
            }
          }
        }
    });
  } else {
    alert("حذف ناموفق بود. دوباره تلاش کنید");
  }
});
}

var token = getCookie('token');

$(document).ready(() => {

  updateTodos();

  $("#add-todo").click(() => {
    $("#add-todo-form").css('display', 'block');
    $("#add-todo").css('display', 'none');
  });

  $("#add-todo-always").click(() => {
    $("#add-todo-form").css('display', 'block');
    $("#add-todo-always").css('display', 'none');
  });

  $("#add-todo-cancel").click(() => {
    if ($(".todos-li").length == 0) {
      $("#add-todo").css('display', 'block');
    } else {
      $("#add-todo-always").css('display', 'block')
    }
    $("#add-todo-form").css('display', 'none');
  });

  $("#add-todo-ok").click(() => {
    if ($("#add-todo-input").val()) {
      let todo = $("#add-todo-input").val();

      $.post('/api/addTodo', {user_token: token, todo: todo} , (data) => {
        if (data.res == 'added') {
          updateTodos();
          $("#todos-ul").css('display', 'block');
          $("#add-todo-always").css('display', 'block');
          $("#add-todo-form").css('display', 'none');
        }
      });
    }
  });

});
