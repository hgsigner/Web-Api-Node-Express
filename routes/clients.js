var models = require('../models');
var auth_user = require("../middlewares/authorize_user");
var express = require('express');
var router = express.Router();

router.use(auth_user);

router.route("/")
	.post(function(req, resp){

		req.user.getCompany().then(function(company){
			if(company){
				var client = models.Client.build(req.body);
				company.addClient(client).then(function(client){
					resp.status(201).json(client);
				});
			}else{
				resp.status(422).json({message: "error"});
			}
		});

	})
	.get(function(req, resp){
		req.user.getCompany().then(function(company){
			if(company){
				company.getClients().then(function(clients){
					resp.status(200).json(clients);
				});
			}else{
				resp.status(422).json({message: "error"});
			}
		});
	});

module.exports = router;