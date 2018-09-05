function deleteTodo(db, app) {
  app.post("/api/deleteTodo", (req, res, next) => {
    var token = req.body.user_token;
    var todo_id = req.body.todo_id;
    if (token && todo_id) {
      // lets check that the token belongs to who

      let tokenSql = `SELECT email FROM sessions WHERE token='${token}'`;
      db.query(tokenSql, (tokenErr, tokenRes, tokenFld) => {
        if (tokenErr) console.log(tokenErr);
        if (tokenRes[0]) {
          let email = tokenRes[0].email;

          let checkTodo = `SELECT * FROM todo WHERE id='${todo_id}' AND email='${email}'`;
          db.query(checkTodo, (todoErr, todoRes, todoFld) => {
            if (todoErr) console.log(todoErr);

            if (todoRes[0]) {
              let deleteTodo = `DELETE FROM todo WHERE id='${todo_id}' AND email='${email}'`;

              db.query(deleteTodo, (deleteErr, deleteRes, deleteFld) => {
                if (deleteErr) console.log(deleteErr);

                res.json({
                  res: 'deleted'
                });

              });
            } else {
              res.json({
                res: "todo ID is not correct"
              });
            }

          });
        } else {
          res.json({
            res: "Fake Token"
          });
        }

      });
    } else {
      res.json({
        res: "parameters are missed"
      });
    }

  });
}

module.exports = {
  deleteTodo: function (db, app) {
    return deleteTodo(db, app);
  }
}
