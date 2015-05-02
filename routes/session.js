var user = require('../models').User;
var express = require('express');
var router = express.Router();

router.route("/authenticate")
	.post(function (req, resp) {
		user.find({
			where: {email: req.body.email},
		}).then(function(user){
			if(user){
				if(user.authenticate(req.body.password)){
					resp.status(200).json(user);
				}else{
					resp.status(401).json({message: "Unauthorized user"});
				}
			}else{
				resp.status(404).json({message: "User not found"});
			}
		});

	});

module.exports = router;