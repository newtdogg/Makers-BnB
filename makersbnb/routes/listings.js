var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/new', function(req, res, next) {
  location = req.body.location
  price = parseFloat(req.body.price).toFixed(2)
  guests = parseInt(req.body.guests)
  models.Listing.create({location: location, price: price, maxPeople: guests})
  res.redirect('/')
});

module.exports = router;
