'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      "Clients", 
      "client_type",
      Sequelize.STRING
    );
    queryInterface.addColumn(
      "Clients", 
      "filiation",
      Sequelize.JSON
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn("Clients", "client_type");
    queryInterface.removeColumn("Clients", "filiation")
  }
};
