const colors = require('colors');
const mysql = require('mysql');
const nodemailer = require("nodemailer");

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'TT'
});

db.connect(function(err) {
  if (err) {
    onsole.error('error connecting to database [TT]: '.red + err.stack.green);
    return;
  }
});


// Email config
const emailConnection = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "TeamTwistCo",
        pass: "teamtwist"
    }
});


module.exports = {
  db: db,
  smtpTransport: emailConnection
}
