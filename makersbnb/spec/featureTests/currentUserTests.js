process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');
var models = require('../../models')
var bcrypt = require('bcrypt');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

describe('userSignUp', function(done) {

  function signUpForm(name, username, email, password, confirm) {
    browser.fill('#name', name)
    browser.fill('#username', username)
    browser.fill('#email', email)
    browser.fill('#password', password)
    browser.fill('#password_confirmation', confirm)
  }

  function logInForm(username, password) {
    browser.fill('#username', username)
    browser.fill('#password', password)
  }

  beforeEach(function(done) {
    models.User.truncate();
    browser.visit('/signup', done)
  });


  it("should log in the user immediately after sign up", function(done) {
    signUpForm('Terry', 'cooler_dad', 'test@cooler.com', 'badpw', 'badpw');
    browser.pressButton('Submit').then(function(){
      assert.equal(browser.text('#welcome_message'), 'Signed in as cooler_dad')
      done();
    })
  })

  it("should be able to log out as a user", function(done) {
    signUpForm('Terry', 'cooler_dad', 'test@cooler.com', 'badpw', 'badpw');
    browser.pressButton('Submit').then(function(){
      browser.clickLink('#signout').then(function(){
        assert.equal(browser.text('#welcome_message'), 'Not signed in')
        done();
      })
    })
  })

  it("should be able to log in as a user", function(done) {
    signUpForm('Terry', 'cooler_dad', 'test@cooler.com', 'badpw', 'badpw');
    browser.pressButton('Submit').then(function(){
      browser.clickLink('#signout').then(function(){
        browser.visit('/signin').then(function(){
          logInForm('cooler_dad', 'badpw')
          browser.pressButton('#SignIn').then(function(){
            console.log(userSession.currentUser)
            assert.equal(browser.text('#welcome_message'), 'Signed in as cooler_dad')
            done();
          })
        })
      })
    })
  })
})
