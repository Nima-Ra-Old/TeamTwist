function changeName(db, app){
	app.post("/api/changeName", function(req, res, next){
		let user_id = req.query.user_id;
		let newName = req.query.new_name;

		if (newName != undefined && user_id != undefined){
			db.query("UPDATE `users` SET `name`='"+ newName +"' WHERE `id`='"+ user_id +"'", function(error, results, fields){
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


	app.get("/api/changeName", function(req, res, next){
		res.send("Change Name API");
	});
}

module.exports = {
  changeName: function(db, app){
  	return changeName(db, app);
  }
}
