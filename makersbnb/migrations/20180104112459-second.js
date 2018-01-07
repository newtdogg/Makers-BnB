'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        allowNull: false,
        type: Sequelize.STRING
      },
      username:{
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password:{
        allowNull: false,
        type: Sequelize.TEXT
      },
      email:{
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      }
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
