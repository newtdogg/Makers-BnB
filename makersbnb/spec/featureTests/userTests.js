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

  beforeEach(function(done) {
    models.User.truncate();
    browser.visit('/signup', done)
  });

  // afterEach(function(done) {
  //   models.User.truncate();
  //   browser.visit('/signup', done);
  // })
  //

  it('should have a form to fill in with details', function(done) {
    browser.visit('/signup', function(){
      assert.equal(browser.text('#signUpForm'), 'Name: Username: Email: Password: Confirm password:');
      done();
    });
  });

  it('User should be able to submit information to signup', function(done){
    signUpForm('james', 'cool_dad', 'test@cool.com', 'badpw', 'badpw');
    browser.pressButton('Submit').then(function(){
      models.User.findOne({where: {username: "cool_dad"}}).then(function(user){
        assert.equal(user.username, 'cool_dad');
        done();
      });
    });
  });

  it('Should hash the password on user creation', function(done){
    signUpForm('admin', 'admin', 'admin@admin.com', 'admin', 'admin');
    browser.pressButton('Submit').then(function(){
      models.User.findOne({where: {username: 'admin'}}).then(function(user){
        bcrypt.compare('admin', user.password, function(err, res){
          assert.equal(res, true);
          done()
        });
      });
    });
  })

  xit('cannot sign up with an invalid password', function(){
      return browser.visit('/signup').then(function(){
      signUpForm('dave', 'cool_dave', 'cooldave@456.com', '12345', '54321')
       browser.pressButton('Submit').then(function(){
        models.User.findAll().then(function(items){
          assert.equal(items.length, 1);
        });
      });
    });
  })

  it('cannot signup with a previously used email address', function(done){
    signUpForm('dan', 'TheDaninator', '123@456.com', '999', '999');
    browser.pressButton('Submit').then(function(){
      browser.visit('/signup').then(function(){
        signUpForm('dan', 'meme', '123@456.com', '999', '999');
        browser.pressButton('Submit').then(function(){
          models.User.findAll({where: {email: '123@456.com'}}).then(function(items){
            assert.equal(items.length, 1);
            done();
          });
        });
      });
    });
  })
})
