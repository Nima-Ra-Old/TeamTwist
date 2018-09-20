function getTeams(db, app){
	app.post("/api/getTeams", function(req, res, next){
  		let token = req.body.user_token ? req.body.user_token : false;


			if (token != false) {

				db.query(`SELECT email FROM sessions WHERE token='${token}'`, (tokenErr, tokenRes, tokenFld) => {
					if (tokenErr) console.log(tokenErr);

					if (tokenRes[0]) {
						let email = tokenRes[0].email;

						db.query(`SELECT * FROM teams WHERE email='${email}'`, function(error, results, fields){
			     			if (error) throw error;
			       		if (results.length == 0){
			            results = {
			              res: "You have no team"
			            }
			            res.json(results);
			          }
			          else {
			            res.json(results);
			          }
			    		});


					} else {
						res.json({
							res: 'Fake token'
						});
					}
				});

			} else {
				res.json({
					res: 'parameters are missed'
				})
			}
  	});

  	app.get("/api/getTeams", function(req, res, next){
  		res.send("Documentation For Get User")
  	});
}

module.exports = {
  getTeams: function(db, app){
  	return getTeams(db, app);
  }
}
