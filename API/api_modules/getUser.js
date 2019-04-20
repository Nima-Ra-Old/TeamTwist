function getUser(db, app){
	app.post("/api/getUser", function(req, res, next){
  		let user_token = req.body.user_token;
  		if (user_token != undefined){

				let user_session = `SELECT email FROM sessions
				WHERE token='${user_token}'
				`;

				db.query(user_session, (sessionErr, sessionRes, sessionFld) => {
					if (sessionErr) console.log(sessionErr);

					if (sessionRes[0]){

						// token exists
						let email = sessionRes[0].email;
						let user_details = `SELECT email, username, verify, profilePic, phone, teams, followers, following, lastActivity, joinDate
						FROM users
						WHERE email='${email}'`;

						db.query(user_details, function(error, results, fields){
		     			if (error) throw error;

		     			res.json(results[0]);
		    		});

					} else {
						res.json({
							error: 'Wrong token'
						})
					}
				});

  		}
  		else {
			res.json({
				error: "Parameters are missed"
			});
		}
  	});

  	app.get("/api/getUser", function(req, res, next){
  		res.send("Documentation For Get User")
  	});
}

module.exports = {
  getUser: function(db, app){
  	return getUser(db, app);
  }
}
