process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');
var models = require('../../models')

describe('userSignUp', function(done) {

  function createUser(){
    models.User.findOrCreate({where: {username: 'admin'}, defaults: {name: 'admin', email:"admin@admin.com", password: "admin"}})
  }

  function createUserListing(done){
    models.User.findOne({where: {username: "admin"}}).then(function(user){
      models.Listing.create({location: "london", price: 55.1, maxPeople: 5, UserId: user.id}).then(function(listing){
        user.addListing(listing).then(function(){
          done();
        })
      })
    })
  }

  before(function(done){
    createUser();
    done();
  })

  beforeEach(function(done) {
    models.Listing.truncate();
    createUserListing(done)
  });

  it('Can create a listing', function(done) {
      models.User.findOne({where: {username: "admin"}}).then(function(admin){
        admin.getListings().then(function(listings){
          assert.equal(listings.length, 1);
          done();
        });
      });
  });
})
