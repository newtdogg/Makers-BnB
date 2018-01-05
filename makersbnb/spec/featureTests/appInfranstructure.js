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

    function fillInLocation(location, price, guests) {
      browser.fill('#loco', location)
      browser.fill('#price', price)
      browser.fill('#guests', guests)
    }

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
        fillInLocation('London', '£50', '3')
        browser.pressButton('Submit').then(function(){
          assert.equal(browser.text('#list'), 'Location - London Price/Night - £50 Guests - 3');
          done()
        })
      });

    });
  });
