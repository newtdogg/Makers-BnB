process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');
var models = require('../../models')


  describe('home page', function() {
    // databaseCleaner.clean('airbnb_test');

    before(function() {
      server = app.listen(3000)
      browser = new Browser({ site: 'http://localhost:3000' });
    });

    //after(done => server.close(done));

    describe('pretesting', function(done) {

      before(function(done) {
        models.Listing.truncate();
        browser.visit('/', done);
      })

      it('should load the home page', function() {
        assert.ok(browser.success);
      });

      it('should have a form to fill in with details', function() {
        assert.equal(browser.text('form label'), 'Location: Price/Night: Guests:');
      });

      it('should allow the user to upload a property', function(done) {
        // PressButton returns promise, to test asynch functions we must force
        // wait using done(), which prevents chain of execution continuing.
        browser.fill('#loco', 'London')
        browser.fill('#price', '£50')
        browser.fill('#guests', '3')
        browser.pressButton('Submit', function(){
           assert.equal(browser.text('#list'), 'Location - London | Price/Night - £50 | Guests - 3');
           done();
        })
      });

    });

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
        assert.equal(browser.text('#signUpForm'), 'Name: Username: Email: Password: Confirm password: ');
      });

      it('a user can submit information to sign up', function(){
        signUpForm()
        browser.pressButton('Submit', function(){
          models.User.findAll().then(function(items){
            // console.log(items)
            assert.equal(items.pop().username, 'cool_dad')
            done();
        });

        })
      })
    })
  });
