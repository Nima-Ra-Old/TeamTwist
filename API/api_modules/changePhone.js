function changePhone(db, app){
	app.post("/api/changePhone", function(req, res, next){
		let user_id = req.query.user_id;
		let newPhone = req.query.new_phone;

		if (newPhone != undefined && user_id != undefined){
			db.query("UPDATE `users` SET `phone`='"+ newPhone +"' WHERE `id`='"+ user_id +"'", function(error, results, fields){
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


	app.get("/api/changePhone", function(req, res, next){
		res.send("Change Phone API");
	});
}

module.exports = {
  changePhone: function(db, app){
  	return changePhone(db, app);
  }
}
