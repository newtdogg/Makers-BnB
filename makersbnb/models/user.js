'use strict';
module.exports = function(sequelize, DataTypes){

  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
        },
        isEmail: {
        }
      }
    }
  });
  return User;
};
