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


    after(function(done){
      models.User.truncate();
      done();
    })
    //after(done => server.close(done));

    describe('pretesting', function(done) {

      before(function(done) {
        models.Listing.truncate();
        models.User.findOrCreate({where: {username: 'admin'}, defaults: {name: 'admin', email:"admin@admin.com", password: "admin"}}).then(function(user){
          userSession.setCurrentUser(user)
        })
        browser.visit('/', done);
      })

      it('should load the home page', function() {
        assert.ok(browser.success);
      });

      it('should have a form to fill in with details', function() {
        assert.equal(browser.text('#page-section3'), 'Become a host Location: Price/Night: Guests:');
      });

      it('should not allow the uploading of a property without being logged in', function(done) {
        // PressButton returns promise, to test asynch functions we must force
        // wait using done(), which prevents chain of execution continuing.
        userSession.removeCurrentUser();
        fillInLocation('London', '£50', '3')
        browser.pressButton('Submit').then(function(){
          //assert.equal(browser.text('#listings'), 'Location - London Price/Night - £50 Guests - 3');
          assert.equal(browser.text('#listings'), '');
          done()
        })
      });

      it('should allow the uploading of a property if a user is logged in', function(done) {
        // PressButton returns promise, to test asynch functions we must force
        // wait using done(), which prevents chain of execution continuing.
        fillInLocation('London', '£60', '4')
         models.User.findOrCreate({where: {username: 'admin'}, defaults: {name: 'admin', email:"admin@admin.com", password: "admin"}}).then(function(user){
           userSession.setCurrentUser(user)
           browser.pressButton('Submit').then(function(){
             assert.equal(browser.text('#listings'), 'Location - London Price/Night - £60 Guests - 4');
             done();
           })
         })
      });
    });
  });
