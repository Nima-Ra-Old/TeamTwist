function addUser(db, data, res) {
  var d = new Date();
  var email = data.email;
  var phone = data.phone;
  var username = data.username;
  var password = data.password;
  var now = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();


  let query = "INSERT INTO `users` (username, email, verify, phone, password, lastActivity, joinDate, verifyId) VALUES ("+
  `'${username}',`+
  `'${email}',`+
  `'false',`+
  `'${phone}',`+
  `'${password}',`+
  `'${now}',`+
  `'${now}',`+
  "'0'"+
  ")";

  db.query(query, (err, results, fields) => {
    if (err) throw err;
  });
}

function checkUser(db, data, res) {
  let query = "SELECT * FROM `users` WHERE `email`='"+data.email+"' OR `phone`='"+data.phone+"' OR `username`='"+data.username+"'";
  db.query(query, (error, results, field) => {
    if (error) throw error;
    if (results[0] == undefined) {
      addUser(db, data, res);
      let encoded = data.email;
      res.json({success: "true", encode: encoded});
    } else {
      res.json({success: "false"});
    }
  });
}

function signup (db, app) {
 app.post('/signup', function (req, res, next) {
    checkUser(db , req.body, res);
  });
}
module.exports = {
  postSignup: function (db, app) {
    return signup(db , app);
  }
}
