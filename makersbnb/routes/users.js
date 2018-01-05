var express = require('express');
var models = require('../models');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findOne({where: {username: "admin"}}).then(function(user){
    bcrypt.compare("admin", user.password, function(err, res){
      if(res){
        console.log("Matching", res)
      } else {
        console.log("Not matching")
      }
    })
  })
  res.send('respond with a resource');
});


router.post('/new', function(req, res, next) {
  name = req.body.name
  username = req.body.username
  password = req.body.password
  email = req.body.email
  passwordConfirmation = req.body.password_confirmation

  if(password === passwordConfirmation){
    bcrypt.hash(password, 8, function(err, hash){
      var user = new models.User({name: name, username: username, password: hash, email: email})
      user.save().then(function(newUser){
        console.log("Successfully added to db")
        userNow.setCurrentUser(user)
        res.redirect('/')
      }).catch(function (err) {
        console.log(err.message)
        res.redirect('/signup')
      })
    })
  } else {

    res.redirect('/signup')

  }

  // console.log(name, username, password, email)


});

module.exports = router;
