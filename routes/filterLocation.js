var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/reset', function(req,res,next) {
  userSession.search = null
  res.redirect('/#page-section2')
});

module.exports = router;
