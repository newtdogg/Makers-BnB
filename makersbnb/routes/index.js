var express = require('express');
var models = require('../models')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sessionUsername = null
  userSession.currentUser === null ? sessionUsername = "FLAG" : sessionUsername = userSession.currentUser.username
  models.Listing.findAll().then(function(items) {
    res.render('index', { title: 'JTLN', listings: items, userName: sessionUsername });
  })
});

module.exports = router;
