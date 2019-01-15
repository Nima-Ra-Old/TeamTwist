function deleteDeadline(db, app) {
  app.post('/api/deleteDeadline', (req, res, next) => {
    var token = req.body.user_token;
    var deadlineId = req.body.id;

    if (token && deadlineId) {
      // Token and Id are passed correctly
      // Now we check if the token is real or fake
      let checkToken = `SELECT * FROM sessions WHERE token='${token}'`;
      db.query(checkToken, (tokenErr, tokenRes, tokenFld) => {
        if (tokenErr) console.log(tokenErr);

        if (tokenRes[0]) {
          // Token Exists
          /***
           Now we have the token's owner's email so we are going to
           check if this user has the privileges to delete the requested deadline
           **/
           var email = tokenRes[0].email;

           let checkDeadline = `SELECT * FROM deadlines WHERE email='${email}' AND id='${deadlineId}'`;
           db.query(checkDeadline, (deadlineErr, deadlineRes, deadlineFld) => {
             if (deadlineErr) console.log(deadlineErr);

             if (deadlineRes[0]) {
               // Deadline exists and User can delete it
               // so lets delete it!
               let deleteDeadline = `UPDATE deadlines SET passed='true' WHERE id='${deadlineId}'`;
               db.query(deleteDeadline, (deleteErr, deleteRes, deleteFld) => {
                 if (deleteErr) console.log(deleteErr);

                 res.json({
                   res: "ok"
                 });
               });
             } else {
               // Deadline doesn't exist or user doesn't have enough access rights
               res.json({
                 res: "Deadline doesn't exist or user doesn't have enough access rights"
               });
             }
           });
        } else {
          // Token doesn't exist
          res.json({
            res: 'Fake token'
          });
        }
      });
    } else {
      res.json({
        res: "Missed Parameters"
      });
    }
  });
}


module.exports = {
  deleteDeadline: function(db, app){
  	return deleteDeadline(db, app);
  }
}
