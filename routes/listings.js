var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/new', function(req, res, next) {
  if(userSession.hasCurrentUser()){
    location = req.body.location
    function currencyChek(cost) {
      return (cost[0] === '£' ? cost.slice(1, cost.length) : cost)
    }
    price = parseFloat(currencyChek(req.body.price)).toFixed(2)
    guests = parseInt(req.body.guests)
    userID = userSession.currentUser.id
    models.Listing.create({location: location,
                           price: price,
                           maxPeople: guests,
                           UserId: userID})
    .then(function(listing){
      userSession.currentUser.addListing(listing)
    })
  }
  //TODO: Provide message that user is not logged in.
  res.redirect('/')
});

module.exports = router;
