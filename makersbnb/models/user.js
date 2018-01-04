'use strict';
module.exports = function(sequelize, DataTypes){

  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //     is: /^[a-z\d\-\s]+$/i {
      //       throw new Error "Name may only contain letters and hyphens"
      //     }
      //   }
    },
    // }
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          // throw new Error "That doesn't look like an email address"
        }
      }
    }
  });
  return User;
};
