var models = require('../models');
var auth_user = require("../middlewares/authorize_user");
var express = require('express');
var router = express.Router();

router.use(auth_user);

router.route("/")
	.get(function(req, resp){
		req.user.getCompany().then(function(company){
			if(company){
				company.getUsers().then(function(users){
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
				var client = models.User.build(req.body);
				company.addUser(client).then(function(user){
					resp.status(201).json(user);
				});
			}else{
				resp.status(422).json({message: "error"});
			}
		});

	});

router.route("/:user_id")
	.get(function(req, resp){

		req.user.getCompany().then(function(company){

			company.getUsers({
				where: {id: req.params.user_id}
			}).then(function(user){
				if(user.length){
					resp.status(200).json(user);
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
			}).then(function(user){
				if(user.length){
					user[0].update(req.body)
						.then(function(user){
							if(user){
								resp.status(200).json(user);
							}else{
								resp.status(422).json({message: error});
							}
						});
				}else{
					resp.status(404).json({message: "User not found"});
				}
			});

		});

	})

module.exports = router;
