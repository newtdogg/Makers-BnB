'use strict';
module.exports = function(sequelize, DataTypes){
  var Listing = sequelize.define('Listing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    location: DataTypes.STRING,
    price: DataTypes.FLOAT,
    maxPeople: DataTypes.INTEGER,
  });
  Listing.associate = function(models){
    Listing.belongsTo(models.User)
  };
  return Listing;
};
