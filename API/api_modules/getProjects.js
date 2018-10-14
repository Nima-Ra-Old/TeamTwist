function getProjects(db, app){
	app.post('/api/getProjects', (req, res, next) => {
		var user_token = req.body.user_token ? req.body.user_token : null;

		if (user_token != null) {
			// token is passed
			let sql = `SELECT email FROM sessions WHERE token='${user_token}'`;
			db.query(sql ,(tokenErr, tokenRes, tokenFld) => {
				if (tokenErr) console.log(tokenErr);

				if (tokenRes[0]){
					// token is true
					var email = tokenRes[0].email;
					let sql = `SELECT * FROM projects WHERE email='${email}'`;
					db.query(sql, (projectsErr, projectsRes, projectsFld) => {
						if (projectsErr) console.log(projectsErr);

						if (projectsRes) {
							// we have at least one project
							var projects = [];

							for (var i = 0; i < projectsRes.length; i++){
								let item = projectsRes[i];
								if (!projects.includes(item.name)) {
									projects.push(item.name);
								}
							}

							res.json({
								projectsCount: projects.length,
								projects: projects
							});
						}
					});
				}
				else {
					// token is fake
					res.json({
						error: 'Token is fake'
					})
				}
			});
		}
		else {
			res.json({
				error: 'Token is not passed'
			});
		}
	});
}

module.exports = {
  getProjects: function(db, app){
  	return getProjects(db, app);
  }
}
