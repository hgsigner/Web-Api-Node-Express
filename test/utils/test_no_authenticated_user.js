var app = require("../../app");
var request = require('supertest')(app);

module.exports = function(url, method){
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