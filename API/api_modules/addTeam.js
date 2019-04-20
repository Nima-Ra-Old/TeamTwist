const multer = require("multer");
const fs = require('fs');
const path = require('path');
const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end(err);
};

const upload = multer({
  dest: "documents/team-images"
});


function addTeam(db, app) {
  app.post("/addTeam", upload.single("upl"), (req, res) => {
    var token = req.cookies.token;
    if (token){
      // if token exists
      // let's check if the token is real
      let tokenSQL = `SELECT email FROM sessions WHERE token='${token}'`;
      db.query(tokenSQL, (errToken, resToken, fldToken) => {
        if (errToken) console.log(errToken);

        if (resToken[0]) {
          // token is valid

          const teamName = req.body.teamName;
          const tempPath = req.file.path;
          const randomName = String(Math.floor(Math.random() * (10000000 - 10000) + 10000)); // The file's address
          var email = resToken[0].email;
          // lets add team
          let addSQL = `INSERT INTO teams (name, picture, email, date) VALUES (
            '${teamName}',
            '${randomName}',
            '${email}',
            ''
          )`;
          db.query(addSQL, (addErr, addRes, addFld) => {
            if (addErr) console.log(addErr);

            fs.rename(tempPath, 'documents/team-images/' + randomName + '.png', err => {
              if (err) return handleError(err, res);
              res.json({
                res: "Team added successfully"
              });
            });
          });
        }
      });
    }
  });
}
module.exports = {
  addTeam: (db, app) => {
    return addTeam(db, app)
  }
}
