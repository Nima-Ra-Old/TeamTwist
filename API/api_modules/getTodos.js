function getTodos(db, app){
	app.post("/api/getTodos", function(req, res, next){
  		let user_id = req.query.user_id;
  		if (user_id != undefined){
			db.query("SELECT `todo` FROM `todo` WHERE `user_id`='" + user_id + "'", function(error, results, fields){
     			if (error) throw error;
       		if (results.length == 0){
            results = {
              status: "You have no todos"
            }
            res.json(results);
          }
          else {
            res.json(results);
          }
    		});
  		}
  		else {
			res.json({
				error: "Parameters are missed"
			});
		}
  	});

  	app.get("/api/getTodos", function(req, res, next){
  		res.send("Documentation For Get User")
  	});
}

module.exports = {
  getTodos: function(db, app){
  	return getTodos(db, app);
  }
}
