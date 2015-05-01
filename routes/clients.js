var models = require('../models');
var auth_user = require("../middlewares/authorize_user");
var express = require('express');
var router = express.Router();

router.use(auth_user);

router.route("/")
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
	})
	.post(function(req, resp){

		req.user.getCompany().then(function(company){
			if(company){

				var client = models.Client.build(req.body);
				
				company.addClient(client)
					.then(function(client){
						resp.status(201).json(client);
					})
					.catch(function(error){
						resp.status(422).json({message: error});
					});

			}else{
				resp.status(404).json({message: "Company not found"});
			}
		});

	});

router.route("/:client_id")
	.get(function(req, resp){

		req.user.getCompany().then(function(company){

			company.getClients({
				where: {id: req.params.client_id}
			}).then(function(clients){
				if(clients.length){
					resp.status(200).json(clients[0]);
				}else{
					resp.status(404).json({message: "Client not found"});
				}
			});

		});

	})
	.patch(function(req, resp){

		req.user.getCompany().then(function(company){

			company.getClients({
				where: {id: req.params.client_id}
			}).then(function(clients){
				if(clients.length){
					clients[0].update(req.body)
						.then(function(client){
							resp.status(200).json(client);
						})
						.catch(function(error){
							resp.status(422).json({message: error});
						});
				}else{
					resp.status(404).json({message: "Client not found"});
				}
			});

		});

	})

module.exports = router;