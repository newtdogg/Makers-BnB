var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/', function(req,res,next) {
  userSession.currentUserSearch(req.body.searchLocation)
  res.redirect('/')
});

module.exports = router;
