'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      "Clients",
      "additional_info",
      Sequelize.JSON
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn("Clients", "additional_info");
  }
};
