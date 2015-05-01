'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['master', 'manager', 'colaborator']]
      }
    },
    access_token: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:true
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models){
        User.belongsTo(models.Company);
      }
    },
    instanceMethods: {
      fullname: function(){
        return this.firstName + this.lastName;
      },
      authenticate: function(pwd){
        return bcrypt.compareSync(pwd, this.password);
      }
    },
    hooks: {
      beforeCreate: function(user, options, fn){
        
        // Access Token
        user.access_token = require('crypto').randomBytes(48).toString('base64');

        //Password

        var raw_pass = user.password;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(raw_pass, salt);
        user.password = hash

        fn(null, user);
      }
    }
  });
  return User;
};