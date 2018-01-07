process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');
var models = require('../../models')

describe('userSignUp', function(done) {

  function createUser() {
    return models.User.create({name: "admin", username: "admin", password:"admin", email:"admin@admin.com"});
  }

  function createListing(){
    return models.Listing.create({location: "london", price: 55.1, maxPeople: 5})
  }

  beforeEach(function(done) {
    models.User.truncate();
    done();
  });

  it('Can create a listing', function(done) {
    user = createUser();
    listing = createListing();
    user.addListing(listing);
    models.User.findOne({where: {username: "admin"}}).then(function(admin){
      admin.getListings().then(function(listings){
        assert.equal(listings.length, 1);
        done();
      });
    });

  });

  // it('User should be able to submit information to signup', function(done){
  //   signUpForm('james', 'cool_dad', 'test@cool.com', 'badpw', 'badpw');
  //   browser.pressButton('Submit').then(function(){
  //     models.User.findOne({where: {username: "cool_dad"}}).then(function(user){
  //       assert.equal(user.username, 'cool_dad');
  //       done();
  //     });
  //   });
  // });
})
