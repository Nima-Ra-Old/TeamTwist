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
    console.error('error connecting to database [TT]: '.red + err.stack.green);
    return;
  }
});


// Email config
const emailConnection = nodemailer.createTransport({
    host: "mail.nima-ra.ir",
    port: 465,
    secure: true,
    auth: {
        user: "teamtwist@nima-ra.ir",
        pass: "PV7WBRYakXFjAF4"
    },  
    tls: {
      rejectUnauthorized: false
    }
});

emailConnection.verify(function(error, success) {
  if (error) {
    console.log(error.red);
  } else {
    console.log("Server is ready to take our messages".green);
  }
});

module.exports = {
  db: db,
  smtpTransport: emailConnection
}
