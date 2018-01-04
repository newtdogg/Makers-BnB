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
    signUpForm()
    return browser.pressButton('Submit').then(function(){
      models.User.findAll().then(function(items){
        assert.equal(items.pop().username, 'cool_dad')
      })
    })
  })

  it('a user can submit information to sign up', function(){
    console.log(browser.url)
    browser.visit('/signup').then(function(){
      console.log(browser.url)
      signUpForm()
      return browser.pressButton('Submit').then(function(){
        models.User.findAll().then(function(items){
          assert.equal(items.pop().username, 'cool_dad')
        })
      })
    })
  })
})
