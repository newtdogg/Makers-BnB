var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req,res,next) {
  res.render('signup')
});

module.exports = router;
