function getDeadlines (db, app) {
    app.post("/api/getDeadlines", function(req, res, next){
      let token = req.body.user_token ? req.body.user_token : false;

      if (token == false){
        // token isn't sent
        res.json({
          res: 'parameters are missed'
        });
      } else {
        let query = `SELECT * FROM sessions WHERE token='${token}'`;
        db.query(query, (tokenErr, tokenRes, tokenFld) => {
          if (tokenErr) console.log(tokenErr);

          else {
            if (tokenRes[0]){
              // token is valid
              var email = tokenRes[0].email;
              // lets get related deadlines to this user :)
              let query = `SELECT * FROM deadlines WHERE email='${email}' AND passed='false'`;
              db.query(query, (deadlinesErr, deadlinesRes, deadlinesFld) => {
                if (deadlinesErr) console.log(deadlinesErr);
                else {
                  if (deadlinesRes[0]) {
                    // Oh, we have some deadlines!
                    res.json({
                      res: "okay",
                      deadlines: deadlinesRes
                    });
                  } else {
                    res.json({
                      res: 'you do not have any deadlines.'
                    })
                  }
                }
              });
            } else {
              // token is a fake one!
              res.json({
                res: "Fake Token"
              });
            }
          }
        });
      }
    });
}

module.exports = {
  getDeadlines: function (db, app) {
    return getDeadlines(db, app);
  }
}
