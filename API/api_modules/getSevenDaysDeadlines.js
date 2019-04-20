function getSevenDaysDeadlines(db, app) {
  const jdf = require('../../src/server/source_files/date-converter.js');

  /**
  First we need to check if user passed the token to us or not.
  Secondly we'll check if the token is a fake or not
  Third we'll get the email if the token is real
  fourth user's team will be gotten
  Then we will search for deadlines in 7 following days which are related to the teams or user's email.
  And finally the data will be sent!
  ***/

  app.post('/api/getSevenDaysDeadlines', (req, res, next) => {
    let token = req.body.user_token;
    if (token) {
      // First Step Is Done
      let checkToken = `SELECT * FROM sessions WHERE token='${token}'`;
      db.query(checkToken, (tokenErr, tokenRes, tokenFld) => {
        if (tokenErr) console.log(tokenErr);

        if (tokenRes[0]) {
          // Second Step Is Done
          let email = tokenRes[0].email;
          let teams = `SELECT * FROM teams WHERE email='${email}'`;
          db.query(teams, (teamsErr, teamsRes, teamsFld) => {
            if (teamsErr) console.log(teamsErr);
            let teams_list = teamsRes;
            let conditions_line = `email='${email}'`;
            for (let i = 0; i < teams_list.length; i++) {
              conditions_line += ` OR team='${teams_list[i].name}'`;
            }

            var date = new Date();
            let gy = date.getFullYear();
            let gm = date.getMonth() + 1;
            let gd = date.getDate();
            var today = jdf.gregorian_to_jalali(gy,gm,gd);
            today = `${today[0]}/${today[1]}/${today[2]}`;
            let date_line = `deadline='${today}'`;

            for (var i = 1; i < 7; i++){
              var today = jdf.gregorian_to_jalali(gy,gm,gd);
              let day = today[0] + '/' + today[1] + '/' + (today[2] + i);
              date_line += ` OR deadline='${day}'`
            }

            let searchSQL = `SELECT * FROM deadlines WHERE (${conditions_line}) AND (${date_line}) AND task='false'`;
            db.query(searchSQL, (searchErr, searchRes, searchFld) => {
              if (searchErr) console.log(searchErr);

              if (searchRes[0]) {
                res.json({
                  res: "ok",
                  deadlines: searchRes
                });
              } else {
                res.json({
                  res: "There are no deadlines for the 7 following days"
                });
              }
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
  getSevenDaysDeadlines: function (db, app) {
    return getSevenDaysDeadlines(db, app);
  }
}
