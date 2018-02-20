'use strict';
module.exports = function(sequelize, DataTypes){

  var UserListing = sequelize.define('UserListing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ListingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });
  return UserListing;
};
