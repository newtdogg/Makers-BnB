process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');
var models = require('../../models')
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

  function fillInLocation(location, price, guests) {
    browser.fill('#loco', location)
    browser.fill('#price', price)
    browser.fill('#guests', guests)
  }

  describe('locationSearch', function(done) {

    before(function(done) {
      models.Listing.truncate();
      browser.visit('/', done);
    })

    it('should have a form to search for location', function(done) {
      assert.equal(browser.text('#searchLocation'), 'Enter your destination:');
      done();
      });

      it("should allow a user to search by location", function(done) {
        fillInLocation('London', '£50', '3')
        browser.pressButton('Submit').then(function(){
          browser.fill('#searchLoco', 'London')
          browser.pressButton('Submit').then(function(){
            assert.equal(browser.text('#listingLoco'), 'Location - London')
            done();
          })
        })
      })
    });
