function changePassword(db, app){
	app.post("/api/changePassword", function(req, res, next){
		let user_id = req.query.user_id;
		let newPassword = req.query.new_password;
		let oldPassword = req.query.old_password;

		if (newPassword != undefined && user_id != undefined && oldPassword != undefined){
			db.query("SELECT `password` FROM `users` WHERE `id`='"+ user_id +"'", function(req, results, next){
				console.log(oldPassword == results[0].password);
				if (oldPassword == results[0].password && newPassword != results[0].password){

					db.query("UPDATE `users` SET `password`='"+ newPassword +"' WHERE `id`='"+ user_id +"'", function(error, results, fields){
						if (error) throw error;
					});
					res.json({
						error: false,
						results: "Success"
					});
				}

				else {
					res.json({
						error: false,
						results: "Failed"
					});
				}
			});
		}
		else {
			res.json({
				error: "Parameters are missed"
			});
		}
	});


	app.get("/api/changePassword", function(req, res, next){
		res.send("Change password API");
	});
}

module.exports = {
  changePassword: function(db, app){
  	return changePassword(db, app);
  }
}
