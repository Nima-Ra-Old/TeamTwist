function revokeToken(db, app) {
  app.post('/api/revokeToken', (req, res, next) => {
    var token = req.body.token;

    let verifyToken =  `SELECT * FROM sessions
    WHERE token='${token}'`;

    db.query(verifyToken, (verifyErr, verifyRes, verify) => {
      if (verifyErr) console.log(verifyErr);

      if (verifyRes[0]) {

        let deleteToken = `DELETE FROM sessions WHERE token='${token}'`;
        db.query(deleteToken, (deleteErr, deleteRes, deleteFld) => {
          if (deleteErr) console.log(deleteErr);

          res.json({reqStatus: "done"});
        });


      } else {
        res.json({reqStatus: 'token is not valid'});
      }
    });
  })
}

module.exports = {
  revokeToken: function(db, app){
  	return revokeToken(db, app);
  }
}
