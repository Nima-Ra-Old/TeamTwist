function changeUsername(db, app){
	app.post("/api/changeUsername", function(req, res, next){
		let user_id = req.query.user_id;
		let newUsername = req.query.new_username;

		if (newUsername != undefined && user_id != undefined){
			db.query("UPDATE `users` SET `username`='"+ newUsername +"' WHERE `id`='"+ user_id +"'", function(error, results, fields){
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


	app.get("/api/changeUsername", function(req, res, next){
		res.send("Change UserName API");
	});
}

module.exports = {
  changeUsername: function(db, app){
  	return changeUsername(db, app);
  }
}
