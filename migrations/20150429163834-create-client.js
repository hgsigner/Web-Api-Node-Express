'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birth_day: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: "Companies",
        referencesKey: "id",
        onUpdate: 'CASCADE',
        onDelete: ' RESTRICT'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Clients');
  }
};
