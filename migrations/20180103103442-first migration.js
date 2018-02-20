'use strict';

module.exports = {
  up: function(queryInterface, Sequelize){
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
      },
      UserId:{
        type: Sequelize.INTEGER
      },
    });

  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Listings');
  }
};
