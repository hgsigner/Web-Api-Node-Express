'use strict';
module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    birth_day: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Client.belongsTo(models.Company);
      }
    }
  });
  return Client;
};