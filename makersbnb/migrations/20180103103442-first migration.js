'use strict';

module.exports = {
  up: function(queryInterface, Sequelize){
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('Listings', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location:{
        type: Sequelize.STRING
      },
      price:{
        type: Sequelize.FLOAT
      },
      maxPeople:{
        type: Sequelize.INTEGER
      }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Listings');
  }
};
