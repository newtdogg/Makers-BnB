process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');
var models = require('../../models')

describe('userSignUp', function(done) {

  function signUpForm() {
    browser.fill('#name', 'Trevor')
    browser.fill('#username', 'cool_dad')
    browser.fill('#email', 'cool_dad@yahoo.com')
    browser.fill('#password', '123456')
    browser.fill('#password_confirmation', '123456')
  }

  before(function(done) {
    models.User.truncate();
    browser.visit('/signup', done);
  })

  it('should have a form to fill in with details', function() {
    assert.equal(browser.text('#signUpForm'), 'Name: Username: Email: Password: Confirm password:');
  });

  it('a user can submit information to sign up', function(){
    signUpForm('james', 'cool_dad', '123@456.com', '12345', '12345')
    return browser.pressButton('Submit').then(function(){
      models.User.findAll().then(function(items){
        assert.equal(items.pop().username, 'cool_dad')
      })
    })
  })

  it('a user cannot sign up with an invalid password', function(){
      return browser.visit('/signup').then(function(){
      signUpForm('dave', 'cool_dave', 'cooldave@456.com', '12345', '54321')
       browser.pressButton('Submit').then(function(){
        models.User.findAll().then(function(items){
          assert.equal(items.length, 1)
        })
      })
    })
  })

  it('a user cannot signup with a previously used email address', function(){
      return browser.visit('/signup').then(function(){
      signUpForm('ted', 'cool_ted', '123@456.com', '12345', '12345')
      browser.pressButton('Submit').then(function(){
        models.User.findAll().then(function(items){
          assert.equal(items.length, 1)
        })
      })
    })
  })
})
