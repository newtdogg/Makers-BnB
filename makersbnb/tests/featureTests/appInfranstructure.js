process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');

  describe('home page', function() {

    before(function() {
      server = app.listen(3000)
      this.browser = new Browser({ site: 'http://localhost:3000' });
    });

    after(done => server.close(done));

    describe('pretesting', function(done) {

      before(function(done) {
        this.browser.visit('/', done);
      })

      it('should load the home page', function() {
        assert.ok(this.browser.success);
      });

      it('should see express', function() {
        assert.equal(this.browser.assert.text('h1'), 'Express');
      });

    });

  });
