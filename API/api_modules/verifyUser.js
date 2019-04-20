function verifyUser(db, app) {
  app.post('/api/verifyUser', (req, res, next) => {
    let verifyKey = Object.keys(req.body).length === 0 && Object.keys(req.query).length != 0 ? req.query.id : req.body.id;

    if (verifyKey === undefined){
      // verifyKey does not passed
      res.json({
        status: "missed parameters"
      });
    } else {
      let query = `UPDATE users SET
      verify=true
      WHERE verifyId=${verifyKey}
      `;
      db.query(query, (updateErr, updateRes, updateFld) => {
        if (updateErr) console.log(updateErr);

        if (updateRes.changedRows == 1) {
          res.json({
            status: "done"
          });
        } else {
          res.json({
            status: "error occured"
          });
        }
      });
    }
  });
}

module.exports = {
  verifyUser: function(db, app){
    return verifyUser(db, app);
  }
}
