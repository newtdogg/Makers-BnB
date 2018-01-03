var express = require('express');
var models = require('../models')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Listing.create({location: "London", price: 66.1, maxPeople: 3})
  res.render('index', { title: 'Express' });
});

module.exports = router;
