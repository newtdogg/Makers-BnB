var express = require('express');
var models = require('../models')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Listing.findAll().then(function(items) {
    res.render('index', { title: 'JTLN', listings: items });
  })
});

module.exports = router;
