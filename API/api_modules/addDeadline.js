function addDeadline(db, app) {
  app.post('/api/addDeadline', (req, res, next) => {
    var token = req.body.user_token;
    var task = req.body.task;
    var text = req.body.text;
    var expire_date = req.body.expire_date;
    var team = req.body.team;

    if (token && expire_date && task && text && team) {

      let checkToken = `SELECT email FROM sessions WHERE token='${token}'`;
      db.query(checkToken, (tokenErr, tokenRes, tokenFld) => {
        if (tokenErr) console.log(tokenErr);

        if (tokenRes[0]) {

          let email = tokenRes[0].email;

          let addDeadline = `INSERT INTO deadlines (text, task, team, email, deadline, passed) VALUES (
            '${text}',
            '${task}',
            '${team}',
            '${email}',
            '${expire_date}',
            'false'
          )`;

          db.query(addDeadline, (addErr, addRes, addFld) => {
            if (addErr) console.log(addErr);
            else res.json({res: "Added"});
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
  addDeadline: function (db, app) {
    return addDeadline(db, app);
  }
}
