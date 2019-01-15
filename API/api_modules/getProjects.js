function getProjects(db, app){
	app.post("/api/getProjects", function(req, res, next){
  		let user_id = req.query.user_id;
  		if (user_id != undefined){
			db.query("SELECT `name` FROM `projects` WHERE `user_id`='" + user_id + "'", function(error, results, fields){
     			if (error) throw error;
       		if (results.length == 0){
            results = {
              status: "You have no projects"
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

  	app.get("/api/getProjects", function(req, res, next){
  		res.send("Documentation For Get User")
  	});
}

module.exports = {
  getProjects: function(db, app){
  	return getProjects(db, app);
  }
}
