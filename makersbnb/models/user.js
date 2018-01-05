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
      unique: {
        args: true,
        msg: "That username appears to be taken"
      },
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
      unique: {
        args: true,
        msg: "That email address appears to be taken"
      },
      validate: {
        notEmpty: {
        },
        isEmail: {
          args: true,
          msg: "Needs to be in email format"
        }
      }
    }
  });
  return User;
};
