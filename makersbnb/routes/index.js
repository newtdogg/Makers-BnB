var express = require('express');
var models = require('../models')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Listing.findAll().then(function(items) {
    res.render('index', { title: 'JTLN', listings: items });
  })
  // models.Listing.create({location: "London", price: 66.1, maxPeople: 3})
});

router.post('/listing/new', function(req, res, next) {
  // models.Listing.create({location: "London", price: 66.1, maxPeople: 3})
  location = req.body.location
  price = parseFloat(req.body.price).toFixed(2)
  guests = parseInt(req.body.guests)
  models.Listing.create({location: location, price: price, maxPeople: guests})
  res.redirect('/')
});

module.exports = router;
