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
  app.post("/uploadTeamLogo", upload.single("upl"), (req, res) => {
    console.log(req);
    const tempPath = req.file.path;
    const randomName = 'documents/team-images/' + String(Math.floor(Math.random() * (10000000 - 10000) + 10000)); // The file's address
    fs.rename(tempPath, randomName, err => {
      if (err) return handleError(err, res);

      res
        .status(200)
        .contentType("text/plain")
        .end("File uploaded!");
      });
    }
  )
}
module.exports = {
  addTeam: (db, app) => {
    return addTeam(db, app)
  }
}
