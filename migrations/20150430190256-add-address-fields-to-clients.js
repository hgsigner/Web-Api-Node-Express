'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    queryInterface.addColumn(
      "Clients", 
      "address",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "address_complement",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "address_number",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "cep",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "phone",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "city",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "state",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "forwarded_by",
      Sequelize.STRING
    );

    queryInterface.addColumn(
      "Clients", 
      "interviewed_at",
      Sequelize.DATE
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn("Clients", "address");
    queryInterface.removeColumn("Clients", "address_complement");
    queryInterface.removeColumn("Clients", "address_number");
    queryInterface.removeColumn("Clients", "cep");
    queryInterface.removeColumn("Clients", "phone");
    queryInterface.removeColumn("Clients", "city");
    queryInterface.removeColumn("Clients", "state");
    queryInterface.removeColumn("Clients", "forwarded_by");
    queryInterface.removeColumn("Clients", "interviewed_at");
  }
};
