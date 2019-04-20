function generateVerifyKey(listResult){
  let key = Math.floor((Math.random() * 100000000000000000000) + 10000000000000000000);
  if (listResult.includes(key)){
    generateVerifyKey(listResult);
  } else {
    return key;
  }
}

function sendEmail(db, smtpTransport, email){
  db.query("SELECT `verifyId` FROM `users` WHERE `verify`='false'", (err, listResult, listFields) => {
    if (err) console.log(err);
    var key = generateVerifyKey(listResult);

    db.query("UPDATE `users` SET `verifyId`='"+key+"' WHERE `email`='"+email+"'", (err, keyResult, keyFields) => {
      if (err) console.log(err);
    });

    host = "127.0.0.1:8545";
    link = "http://"+host+"/verify?id="+key;

    mailOptions = {
      to: email,
      subject: "Team Twist Email Validation",
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }

    smtpTransport.sendMail(mailOptions, (err, res) => {
      if (err) throw err;
    });

    console.log("User Signup: " + link.red);

    //res.sendFile('/src/client/emailValidation/verify.html', {root: './'});

    });
}

function createUser(db, app, smtpTransport){
  app.post("/api/createUser", (req, res, next) => {

    var data = Object.keys(req.body).length === 0 && Object.keys(req.query).length != 0 ? req.query : req.body;
    var user = {
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone
    };

    if (user.username === undefined || user.email === undefined || user.password === undefined || user.phone === undefined){
      res.json({reqStatus: "missed parameters"});
    } else {
      let sql = `SELECT * FROM users
      WHERE email='${user.email}' OR username='${user.username}' OR email='${user.phone}' OR phone='${user.phone}'
      `;

      db.query(sql, (checkErr, checkRes, checkFld) => {
        if (checkErr) console.log(checkErr);

        if (checkRes == 0){
            // User does not exist
            var d = new Date();
            var now = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();

            let sql = `INSERT INTO users (username, email, verify, phone, password, lastActivity, joinDate) VALUES(
              '${user.username}',
              '${user.email}',
              'false',
              '${user.phone}',
              '${user.password}',
              '${now}',
              '${now}'
            )`;

            // INSERT USER's data to the database
            db.query(sql, (addErr, addRes, addFld) => {
              if (addErr) console.log(addErr);

              res.json({reqStatus: "done"});
              sendEmail(db, smtpTransport, user.email);

            });

        } else {
          // User exits
          res.json({reqStatus: "user exists"});
        }
      });
    }

  });
}


module.exports = {
  createUser: function(db, app, smtpTransport){
    return createUser(db, app, smtpTransport);
  }
}
