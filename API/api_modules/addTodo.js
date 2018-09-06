function addTodo(db, app) {
  app.post('/api/addTodo', (req, res, next) => {
    var token = req.body.user_token;
    var todo = req.body.todo;

    if (token && todo) {

      let checkToken = `SELECT email FROM sessions WHERE token='${token}'`;
      db.query(checkToken, (tokenErr, tokenRes, tokenFld) => {
        if (tokenErr) console.log(tokenErr);

        if (tokenRes[0]) {

          let email = tokenRes[0].email;
          let d = new Date();
          let addingDate = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
          let addTodo = `INSERT INTO todo (
            email,
            todo,
            date
          ) VALUES (
            '${email}',
            '${todo}',
            '${addingDate}'
          )`;

          db.query(addTodo, (addErr, addRes, addFld) => {
            if (addErr) console.log(addErr);

            res.json({
              res: "added"
            });
          });

        } else {
          res.json({
            res: "fake token"
          });
        }

      });

    } else {
      res.json({
        res: "missed parameters"
      });
    }
  });
}

module.exports = {
  addTodo: function (db, app) {
    return addTodo(db, app);
  }
}
