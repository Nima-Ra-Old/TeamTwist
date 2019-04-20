function deleteTeam(db, app) {
  app.post('/api/deleteTeam', (req, res, next) => {
    if (req.body.user_token && req.body.teamId) {
      var token = req.body.user_token;
      var teamId = req.body.teamId;
      let checkToken = `SELECT * FROM sessions WHERE token='${token}'`;
      db.query(checkToken, (tokenErr, tokenRes, tokenFld) => {
        if (tokenErr) console.log(tokenErr);

        if (tokenRes[0]) {
          // token is valid
          let deleteSQL = `DELETE FROM teams WHERE id='${teamId}'`;
          db.query(deleteSQL, (deleteErr, deleteRes, deleteFld) => {
            if (deleteErr) console.log(deleteErr);

            res.json({
              res: 'Team deleted.',
              finalResult: true
            });
          });
        } else {
          res.json({
            res: 'token is not valid',
            finalResult: false
          });
        }
      });
    } else {
      res.json({
        res: "missed parameters",
        finalResult: false
      });
    }
  })

}

module.exports = {
  deleteTeam: function (db, app) {
    return deleteTeam(db, app);
  }
}
