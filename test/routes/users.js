var expect = require('chai').expect;
var app = require("../../app");
var models = require("../../models");
var testNoAuthUser = require("../utils/test_no_authenticated_user");
var request = require('supertest')(app);

function newUserParams(email){
	return {
		first_name: "Flora",
    last_name: "Dorea",
    email: email,
    role: "manager",
    password: "test"
	}
}

describe('Users routes', function(){

	var company;
	var loggedUser;

	before(function(done){

		models.sequelize.sync({force: true, logging: false}).then(function(){

			models.Company.create({
				name: "Aion"
			}).then(function(_company){
				company = _company;
				var _userB = models.User.build(newUserParams("master@test.com"));
				company.addUser(_userB).then(function(_user){
					loggedUser = _user;
					done(null);
				});
			});

		});

	});

	context("/api/v1/users", function(){

		context("#GET", function(){

			testNoAuthUser("/api/v1/users", "get");

			it("gets users list with access_token", function(done){
				request
					.get("/api/v1/users")
					.set("App-Access-Token", loggedUser.access_token)
					.expect("Content-Type", "application/json")
					.expect(200, done);
			});

		});

		context("#POST", function(){

			testNoAuthUser("/api/v1/users", "post");

			it("creates a new user", function(done){
				request
					.post("/api/v1/users")
					.set("App-Access-Token", loggedUser.access_token)
					.send(newUserParams("manager_1@test.com"))
					.expect("Content-Type", "application/json")
					.expect(201, done);
			});

			it("cant create users with the same email", function(done){
				
				var _params = newUserParams("manager_2@test.com")

				var _user = models.User.build(_params);
				company.addUser(_user);
				
				request
					.post("/api/v1/users")
					.set("App-Access-Token", loggedUser.access_token)
					.send(_params)
					.expect("Content-Type", "application/json")
					.expect(400, done);
			})

		});

	});

	context("/api/v1/users/:user_id", function(){

		context("#GET", function(){

			testNoAuthUser("/api/v1/users/1", "get");

			it("shows a given user", function(done){
				var _params = newUserParams("manager_3@test.com")
				var _user = models.User.build(_params);
				company.addUser(_user)
					.then(function(user){
						return user.id
					}).then(function(userId){
						request
							.get("/api/v1/users/" + userId)
							.set("App-Access-Token", loggedUser.access_token)
							.expect("Content-Type", "application/json")
							.expect(200)
							.end(function(err, res){
								if(err) return done(err);
								expect(res.body).to.not.include.keys("password");
								done();
							});
					});
				
			});

		});

	});

});
