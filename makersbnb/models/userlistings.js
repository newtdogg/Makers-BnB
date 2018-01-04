'use strict';
module.exports = function(sequelize, DataTypes){

  var UserListing = sequelize.define('UserListing', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listingid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    
  });
  return UserListing;
};
