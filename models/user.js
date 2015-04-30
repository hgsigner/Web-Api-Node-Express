'use strict';
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
      }
    },
    hooks: {
      beforeCreate: function(user, options, fn){
        user.access_token = require('crypto').randomBytes(48).toString('base64');
        fn(null, user);
      },
    }
  });
  return User;
};