var express = require('express');
var models = require('../models')
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

router.post('/', function(req, res, next) {
  username = req.body.username
  password = req.body.password
  models.User.findOne({where: {username: username}}).then(function(user){
    bcrypt.compare(password, user.password, function(err, match){
      if(match){
        console.log('matched')
        userSession.setCurrentUser(user)
        res.redirect('/')
      } else {
        console.log('did not match')
        res.redirect('/signin')
      }
    })
  })
});

module.exports = router;
