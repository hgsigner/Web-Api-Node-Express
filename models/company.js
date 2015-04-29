'use strict';
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Company.hasMany(models.User);
        Company.hasMany(models.Client);
      }
    }
  });
  return Company;
};