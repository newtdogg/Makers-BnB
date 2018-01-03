process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');

  describe('home page', function() {

    before(function() {
      server = app.listen(3000)
      browser = new Browser({ site: 'http://localhost:3000' });
    });

    after(done => server.close(done));

    describe('pretesting', function(done) {

      before(function(done) {
        browser.visit('/', done);
      })

      it('should load the home page', function() {
        assert.ok(browser.success);
      });

      it('should have a form to fill in with details', function() {
        assert.equal(browser.text('form label'), 'Location: Price/Night: Guests:');
      });

      it('should allow the user to upload a property', function() {
        browser.fill('#loco', 'London')
        browser.fill('#price', '50')
        browser.fill('#guests', '3')
        // browser.document.forms[0].submit()
        assert.equal(browser.text('li'), 'Location - London | Price/Night - £50 | Guests - 3');
      });

    });

  });
