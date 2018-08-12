function dashboard(db, app) {
  app.get('/panel', (req, res, next) => {
    if (req.cookies == undefined || req.cookies.token == undefined) {
      res.sendFile('/src/client/404/404.html', {root: './'});
    }
    else {
      db.query(`SELECT token FROM sessions
        WHERE token='${req.cookies.token}'`, (tokenErr, tokenRes, tokenFld) => {
          if (tokenErr) console.log(tokenErr);
          if (tokenRes[0]) {
            res.sendFile('/src/client/panel/dashboard/dashboard.html', {root: './'});
          }
          else {
            res.sendFile('/src/client/404/404.html', {root: './'});
          }
        });
    }
  });
}

module.exports = {
  dashboard: (db, app) => {
    return dashboard(db, app);
  }
}
