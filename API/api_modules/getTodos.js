function getTodos(db, app){
	app.post("/api/getTodos", function(req, res, next){

		var token = req.body.user_token;
		if (token) {
			let get_user = `SELECT email FROM sessions WHERE token='${token}'`;
			db.query(get_user, (userErr, userRes, userFld) => {

				if (userErr) console.log(userErr);

				if (userRes[0]) {

				let email = userRes[0].email;
				// now we can get the todos
				let get_todo = `SELECT id, todo FROM todo WHERE email='${email}'`;

				db.query(get_todo, (todoErr, todoRes, todoFld) => {
					if (todoErr) console.log(todoErr);

					if (todoRes[0]) {
						let result = [];

						for (var i = 0; i < todoRes.length; i++) {
							result.push({id: todoRes[i].id, todo: todoRes[i].todo});
						}

						res.json({
							res: 'Ok',
							todo: result
						});

					} else {
						res.json({
							res: '404'
						});
					}
				});

				} else {
					res.json({
						res: "Wrong token"
					});
				}

			});
		} else {
		res.json({
			res: "Token is not passed as a parameter"
		});
	}
})
}

module.exports = {
  getTodos: function(db, app){
  	return getTodos(db, app);
  }
}
