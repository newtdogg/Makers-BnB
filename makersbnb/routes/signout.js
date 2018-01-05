var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req,res,next) {
  userSession.removeCurrentUser()
  res.redirect('/')
});

module.exports = router;
