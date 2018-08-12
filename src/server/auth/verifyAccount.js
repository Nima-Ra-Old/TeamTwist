function postVerifyAccount(db, app) {
  app.get('/verifyAccount', (req, res, next) => {
    res.sendFile('emailValidation/verify.html', {root: './src/client'});
  });


  app.get('/verify', (req, res, next) => {
    let verifyKey = Object.keys(req.body).length === 0 && Object.keys(req.query).length != 0 ? req.query.id : req.body.id;

    if (verifyKey === undefined){
      // verifyKey does not passed
      res.sendFile('404/404.html', {root: './src/client'});
    } else {
      let query = `UPDATE users SET
      verify='true'
      WHERE verifyId='${verifyKey}' AND verify='false'
      `;
      db.query(query, (updateErr, updateRes, updateFld) => {
        if (updateErr) console.log(updateErr);

        if (updateRes.changedRows == 1) {
          res.sendFile('verify/verify.html', {root: './src/client'});
        } else {
          res.sendFile('404/404.html', {root: './src/client'});
        }
      });
    }
  });
}

// EXPORT FUNCTION
module.exports = {
  postVerifyAccount: (db, app) => {
    return postVerifyAccount(db, app);
  }
}
