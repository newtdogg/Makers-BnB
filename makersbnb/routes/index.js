var express = require('express');
var models = require('../models')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sessionUsername = null
  userSession.currentUser === null ? sessionUsername = "FLAG" : sessionUsername = userSession.currentUser.username
  console.log(req.session.location )
  if (req.session.location === null) {
    models.Listing.findAll().then(function(items) {
      res.render('index', { title: 'JTLN', listings: items, userName: sessionUsername });
    })
  } else {
    models.Listing.findAll({where: {location: req.session.location}}).then(function(items) {
      console.log(req.session.location)
      req.session.location = null
      res.render('index', { title: 'JTLN', listings: items, userName: sessionUsername });
    })
  }
});

router.post('/search', function(req,res,next) {
  req.session.location = req.body.searchLocation
  res.redirect('/#page-section2')
});

module.exports = router;
