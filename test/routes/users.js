var expect = require('chai').expect;
var app = require("../../app");
var models = require("../../models");
var testNoAuthUser = require("../utils/test_no_authenticated_user");
var request = require('supertest')(app);

describe('User root routes', function(){

	var company;
	var user;

	var managerUser = {
		first_name: "Flora",
    last_name: "Dorea",
    email: "manager@test.com",
    role: "manager",
    password: "test"
	};

	before(function(done){

		models.sequelize.sync({force: true, logging: false}).then(function(){

			models.Company.create({
				name: "Aion"
			}).then(function(_company){
				company = _company;
				var _userB =  models.User.build({
					first_name: "Flora",
			    last_name: "Dorea",
			    email: "test@test.com",
			    role: "manager",
			    password: "test"
				});
				company.addUser(_userB).then(function(_user){
					user = _user;
					done(null);
				});
			});

		});

	});

	context("#GET", function(){

		testNoAuthUser("/api/v1/users", "get");

		it("gets users list with access_token", function(done){
			request
				.get("/api/v1/users")
				.set("App-Access-Token", user.access_token)
				.expect(200, done);
		});

	});

	context("#POST", function(){

		testNoAuthUser("/api/v1/users", "post");

		it("creates a new user", function(done){
			request
				.post("/api/v1/users")
				.set("App-Access-Token", user.access_token)
				.send(managerUser).expect(201, done);
		});

		it("cant create users with the same email", function(done){
			
			var _params = {
				first_name: "Flora",
		    last_name: "Dorea",
		    email: "manager@test2.com",
		    role: "manager",
		    password: "test"
			};

			var _user = models.User.build(_params);
			company.addUser(_user);
			
			request
				.post("/api/v1/users")
				.set("App-Access-Token", user.access_token)
				.send(_params).expect(400, done);
		})

	});

});
