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
    },
    client_type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isIn: [["child", "young", "adult"]]
      }
    },
    filiation: {  
      /*
        "mother" : {
            "first_name" : "Flora",
            "last_name" : "Dorea",
            "email" : "mother@test.com",
            "cpf" : "00000000045",
            "id" : "0093939040",
            "profission" : "administrator",
            "education" : "blblbl",
            "phone" : "0000000000"
        },
        "father" : {
            "first_name" : "Hugo",
            "last_name" : "Dorea",
            "email" : "mother@test.com",
            "cpf" : "00000000045",
            "id" : "0093939040",
            "education" : "blblbl",
            "profission" : "dev",
            "phone" : "0000000000"
        }
      */
      type: DataTypes.JSON
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address_complement: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    forwarded_by: DataTypes.STRING,
    interviewed_at: DataTypes.DATE,
    additional_info: DataTypes.JSON
  }, {
    underscored: true,
    validate: {
      validateFiliation: function(){
        if(this.client_type !== "adult"){
          if(this.filiation){
            //TODO
          }
        }
      }
    },
    classMethods: {
      associate: function(models) {
        Client.belongsTo(models.Company);
      }
    },
    instanceMethods: {
      getAge: function(){
        //TODO
      }
    }
  });
  return Client;
};