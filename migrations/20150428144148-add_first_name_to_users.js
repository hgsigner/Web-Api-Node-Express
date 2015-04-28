'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.addColumn(
      "Users", 
      "first_name",
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "first_name")
  }
};
