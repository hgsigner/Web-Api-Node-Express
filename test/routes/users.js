var expect = require('chai').expect;
var request = require('supertest');
var app = require("../../app");

process.env.NODE_ENV = "test";

describe('User root routes', function(){

	describe("get", function(){

		it("gets users list", function(done){
			request(app)
				.get("/api/v1/users")
				.expect(200, done);
		});

	});

});
