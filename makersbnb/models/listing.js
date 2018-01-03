'use strict';
module.exports = function(sequelize, DataTypes){
  var Listing = sequelize.define('Listing', {
    location: DataTypes.STRING,
    price: DataTypes.FLOAT,
    maxPeople: DataTypes.INTEGER,
  });
  return Listing;
};
