var express = require('express');
var models = require('../models')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sessionUsername = null
  console.log(userSession)
  userSession.currentUser === null ? sessionUsername = "FLAG" : sessionUsername = userSession.currentUser.username
  console.log(sessionUsername)
  models.Listing.findAll().then(function(items) {
    console.log(sessionUsername)
    res.render('index', { title: 'JTLN', listings: items, userName: sessionUsername });
  })
});

module.exports = router;
