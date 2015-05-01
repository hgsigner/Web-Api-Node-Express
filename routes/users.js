var models = require('../models');
var auth_user = require("../middlewares/authorize_user");
var express = require('express');
var router = express.Router();

router.use(auth_user);

/*
 
 endpoints: 
	
	get => 
		all users:
			/api/v1/users
		users by fields: 
			/api/v1/users?role=master|manager|colaborator
	
	post => /api/v1/users

	patch => /api/v1/users/:user_id

	delete => /api/v1/users/:user_id

*/

router.route("/")
	.get(function(req, resp){

		req.user.getCompany().then(function(company){
			if(company){
				var query = JSON.parse(JSON.stringify(req.query));
				company.getUsers({
					where: query
				}).then(function(users){
					resp.status(200).json(users);
				});
			}else{
				resp.status(422).json({message: "error"});
			}
		});

	})
	.post(function(req, resp){

		req.user.getCompany().then(function(company){
			if(company){
				var user = models.User.build(req.body);
				company.addUser(user)
				.then(function(user){
					resp.status(201).json(user);
				}).catch(function(error){
					resp.status(400).json({message: error});
				});
			}else{
				resp.status(404).json({message: "Company not found"});
			}
		});

	});

router.route("/:user_id")
	.get(function(req, resp){

		req.user.getCompany().then(function(company){

			company.getUsers({
				where: {id: req.params.user_id}
			}).then(function(users){
				if(users.length){
					resp.status(200).json(users[0]);
				}else{
					resp.status(404).json({message: "User not found"});
				}
			});

		});

	})
	.patch(function(req, resp){

		req.user.getCompany().then(function(company){

			company.getUsers({
				where: {id: req.params.user_id}
			}).then(function(users){
				if(users.length){
					users[0].update(req.body)
						.then(function(user){
							resp.status(200).json(user);
						})
						.catch(function(error){
							resp.status(422).json({message: error});
						});
				}else{
					resp.status(404).json({message: "User not found"});
				}
			});

		});

	})
	.delete(function(req, resp){

		var req_id = parseInt(req.params.user_id);
		var current_user_id = parseInt(req.user.id);

		console.log(req_id, current_user_id);

		req.user.getCompany().then(function(company){

			company.getUsers({
				where: {id: req_id}
			}).then(function(users){
				if(users.length){
					if(current_user_id !== req_id){
						users[0].destroy().then(function(){
							resp.status(200).json({message: "User deleted"});
						});
					}else{
						resp.status(403).json({message: "Forbidden action"});
					}
				}else{
					resp.status(404).json({message: "User not found"});
				}
			});

		});

	})

module.exports = router;
