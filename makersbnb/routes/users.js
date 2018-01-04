var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/new', function(req, res, next) {
  name = req.body.name
  username = req.body.username
  password = req.body.password
  email = req.body.email
  console.log(name, username, password, email)

  models.User.create({name: name, username: username, password: password, email: email})
  res.redirect('/')
});

module.exports = router;
