var expect = require('chai').expect;
var app = require("../../app");
var models = require("../../models");
var request = require('supertest')(app);

function testNoAuthenticetedUser(url, method){
	switch(method){
		case "get": 
			it("return 404 mith no access_token", function(done){
				request
					.get(url)
					.expect(404, done);
			});
			break;
		case "post":
			it("return 404 mith no access_token", function(done){
				request
					.post(url)
					.expect(404, done);
			});
			break;
		case "patch":
			it("return 404 mith no access_token", function(done){
				request
					.patch(url)
					.expect(404, done);
			});
			break;
		case "delete":
			it("return 404 mith no access_token", function(done){
				request
					.delete(url)
					.expect(404, done);
			});
			break;
	}
}

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

		testNoAuthenticetedUser("/api/v1/users", "get");

		it("gets users list with access_token", function(done){
			request
				.get("/api/v1/users")
				.set("App-Access-Token", user.access_token)
				.expect(200, done);
		});

	});

	context("#POST", function(){

		testNoAuthenticetedUser("/api/v1/users", "post");

		it("creates a new user", function(done){
			request
				.post("/api/v1/users")
				.set("App-Access-Token", user.access_token)
				.send(managerUser).expect(201, done);
		});

	});

});
