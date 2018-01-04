'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('UserListings', {
      userid:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      linkid:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserListings');
  }

};
