var expect = require('chai').expect;
var request = require('supertest');
var app = require("../../app");
var models = require("../../models");

describe('User root routes', function(){

	var company;
	var user;

	before(function(done){
		
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
				done();
			});
		});

	});

	after(function(done){
		user.destroy().then(function(){
			company.destroy().then(function(){
				done();
			});
		});
	});

	context("get", function(){

		it("gets users list", function(done){
			request(app)
				.get("/api/v1/users")
				.set("App-Access-Token", user.access_token)
				.expect(200, done);
		});

		it("doesnt access with wrong creds", function(done){
			request(app)
				.get("/api/v1/users")
				.set("App-Access-Token", "blablls")
				.expect(404, done);
		});

	});

	context("post", function(){

		it("creates an user", function(done){
			request(app)
				.post("/api/v1/users")
				.set("App-Access-Token", user.access_token)
				.send({
					first_name: "Flora",
			    last_name: "Dorea",
			    email: "test@test.com",
			    role: "manager",
			    password: "test"
				}).expect(201, done);
		});

	});

});
