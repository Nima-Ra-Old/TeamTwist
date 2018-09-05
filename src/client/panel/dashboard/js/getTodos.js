function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
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
          $("#add-todo").css('display', 'block');
        }
    });
  } else {
    alert("حذف ناموفق بود. دوباره تلاش کنید");
  }
});
}

var token = getCookie('token');

$(document).ready(() => {
  $.post('/api/getTodos', {user_token: token}, (data) => {

    if (data.res == 'Ok') {
      let todoLength = data.todo.length > 10 ? 10 : data.todo.length;
      for (var i = 0; i < data.todo.length; i++) {
        let todo_element =
        `<li class="todos-li" id="todo-${data.todo[i].id}">
          <span class="todos-span">${i + 1}. ${data.todo[i].todo}</span>
          <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onClick="checkTodo(${data.todo[i].id})">
            <i class="material-icons">check</i>
          </button>
        </li>`;
        $("#todos-ul").append(todo_element);
      }

    } else if (data.res == '404'){
      $("#todos-ul").css('display', 'none');
      $("#add-todo").css('display', 'block');
    }

  })
})
