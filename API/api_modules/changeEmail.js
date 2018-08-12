function changeEmail(db, app){
	app.post("/api/changeEmail", function(req, res, next){
		let user_id = req.query.user_id;
		let newEmail = req.query.new_email;

		if (newEmail != undefined && user_id != undefined){
			db.query("UPDATE `users` SET `email`='"+ newEmail +"' WHERE `id`='"+ user_id +"'", function(error, results, fields){
				if (error) throw error;
				res.json({
					error: false,
					results: "Success"
				});
			});
		}
		else {
			res.json({
				error: "Parameters are missed"
			});
		}
	});


	app.get("/api/changeEmail", function(req, res, next){
		res.send("Change Email API");
	});
}

module.exports = {
  changeEmail: function(db, app){
  	return changeEmail(db, app);
  }
}
