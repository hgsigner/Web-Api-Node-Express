var models = require('../models');

module.exports = function(req, resp, next){
  var user_token = req.get('App-Access-Token');
  models.User.find({
    where: {access_token: user_token}
  }).then(function(user){
    if(user){
      req.user = user;
      next();
    }else{
      resp.status(404).json({message: "User not found"});
    }
  });
};