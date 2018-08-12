
function login(db, app){

  app.post("/login", (req, res, next) => {
    var user = Object.keys(req.body).length === 0 && Object.keys(req.query).length != 0 ? req.query : req.body;
    var email = user.email;
    var password = user.password;

    /**
    first we check if the user exists
    seconde we will create a login token
    third we will add a row to the `sessions` table for this user
    fourth we will update lastActivity coloumn
    **/

    let checkSql = `SELECT * FROM users WHERE email='${email}' AND password='${password}' AND verify='true'`;
    db.query(checkSql, (checkErr, checkRes, checkFld) => {
      if (checkErr) console.log(checkErr);
      if (checkRes[0] != undefined){
        // user exists
        // Going to generate token

        db.query("SELECT token FROM sessions", (tokenErr, tokenRes, TokenFld) => {
          if (tokenErr) console.log(tokenErr);

          // TokenRes is the list of tokens
          // generate user token
          const crypto = require('crypto');
          var tokenAccess = false;
          var tokenKey;

          while (tokenAccess == false){
            var buf = crypto.randomBytes(127);
            var token = buf.toString('hex');

            if (tokenRes.includes(token)){
              // token exists
              tokenAccess = false;
            } else {
              // token does not exist
              tokenKey = token;
              tokenAccess = true;
            }
          }
          // Now token is generated and tokenKey's value is our token
          // we are going to add this token to the sessions table
          let addSql = `INSERT INTO sessions (email, token) VALUES (
            '${email}',
            '${tokenKey}'
          )`;

          db.query(addSql, (addErr, addRes, addFld) => {
            if (addErr) console.log(addErr);
            var d = new Date();

            var now = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();

            let updateSql = `UPDATE users SET lastActivity='${now}' WHERE email='${email}'`;
            db.query(updateSql, (updateErr, updateRes, updateFld) => {
              if (updateErr) console.log(updateErr);

              res.cookie('token', tokenKey, {maxAge: 1000 * 60 * 60 * 24});

              res.json({
                reqStatus: "done",
              });

            });

          });
        });
      }
      else {
        // user does not exist or it is not verified
         res.json({
           reqStatus: "failed"
         });
      }
    });
  });
}

module.exports = {
  postLogin: (db, app) => {
    return login(db, app);
  }
}
