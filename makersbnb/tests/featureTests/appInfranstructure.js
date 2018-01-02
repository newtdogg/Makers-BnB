process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');

  describe('home page', function() {
    it('should load the home page', function() {
      assert.ok(this.browser.success);
    });
  });
