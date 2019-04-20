function getTeams(db, app){
	app.post("/api/getTeams", function(req, res, next){
  		let user_id = req.query.user_id;
  		if (user_id != undefined){
			db.query("SELECT `name` FROM `teams` WHERE `user_id`='" + user_id + "'", function(error, results, fields){
     			if (error) throw error;
       		if (results.length == 0){
            results = {
              status: "You have no team"
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

  	app.get("/api/getTeams", function(req, res, next){
  		res.send("Documentation For Get User")
  	});
}

module.exports = {
  getTeams: function(db, app){
  	return getTeams(db, app);
  }
}
