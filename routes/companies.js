var models = require('../models');
var express = require('express');
var router = express.Router();

router.route("/companies")
	.post(function(req, resp){

		var company = models.Company.build(req.body.company);
		var user = models.User.build(req.body.user);
		user.role = "master";

		company.validate()
			.then(function(err){
				if(err){
					resp.status(422).json({mess: err});
				}else{

					user.validate()
						.then(function(errr){
							if(errr){
								resp.status(422).json({message: err});
							}else{
								company.save()
									.then(function(company){
										company.addUser(user);
										resp.status(201).json(company);
									});
							}
						});

				}
			});

	});

module.exports = router;