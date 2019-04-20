function redirect_to(req, res, db, app, destination) {
  if (req.cookies == undefined || req.cookies.token == undefined) {
    // Send him/her to the 404 page :)
    res.sendFile('/src/client/404/404.html', {root: './'});
  }
  else {
    // Oh, looks like we have things in common...
    // Lets check if it's valid or not

    db.query(`SELECT token FROM sessions WHERE token='${req.cookies.token}'`, (tokenErr, tokenRes, tokenFld) => {
        if (tokenErr) console.log(tokenErr);
        if (tokenRes[0]) {
          // It's valid!
          if (destination == 'panel') {
            res.sendFile('/src/client/panel/dashboard/dashboard.html', {root: './'});
          } else if (destination == 'teams') {
            res.sendFile('/src/client/panel/teams/teams.html', {root: './'});
          }
        }
        else {
          res.sendFile('/src/client/404/404.html', {root: './'});
        }
      });
  }

}
function launcher(db, app) {
  app.get('/panel', (req, res, next) => {
    redirect_to(req, res, db, app, 'panel');
  });

  app.get('/teams', (req, res, next) => {
    redirect_to(req, res, db, app, 'teams');
  });
}

module.exports = {
  launcher: (db, app) => {
    return launcher(db, app);
  }
}
