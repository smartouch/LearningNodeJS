

// force the test environment to 'test'
process.env.NODE_ENV = 'test';

var app = require('../../app.js'); // get the application server module
var assert = require('assert'); // load Node.js assertion module
var Browser = require('zombie'); //use zombie.js as headless browser


describe('contact page', function() {
    var before_successful = false;

	/* Creating TEST server */ 
	before(function() {
		
        try {
        	this.server = http.createServer(app).listen(3001);
    		//console.log('Test instance of the application started. http://%s:%s', server.address().address, server.address().port);
    		var url = "http://" + server.address().address + ":" + server.address().port
    		// initialize the browser using the same port as the test application
    		this.browser = new Browser({ site: url });
            before_successful = true;
        }
        catch (e) {
            // Yes, we swallow this exception.
        }
		
	});
	 
	 // load the contact page
	before(function(done) {
	  this.browser.visit('/contact', done);
	});
	
    function makeTest(name, callback) {
        it(name, function () {
            if (!before_successful) throw Exception("can't perform test");
            callback();
        });
    }

	it('should show contact a form', function() {
        if (!before_successful) throw Exception("can't perform test");
	  assert.ok(this.browser.success);
	  assert.equal(this.browser.text('h1'), 'Contact');
	  assert.equal(this.browser.text('form label'), 'First NameLast NameEmailMessage');
	});
	
	 it('should refuse empty submissions', function(done) {
	        if (!before_successful) throw Exception("can't perform test");
		 var browser = this.browser;
		 browser.pressButton('Send').then(function() {
		 assert.ok(browser.success);
		 assert.equal(browser.text('h1'), 'Contact');
		 assert.equal(browser.text('div.alert'), 'Please fill in all the fields');
		 }).then(done, done);
		 });
		
	 it('should refuse partial submissions', function(done) {
	        if (!before_successful) throw Exception("can't perform test");
		 var browser = this.browser;
		 browser.fill('first_name', 'John');
		 browser.pressButton('Send').then(function() {
		 assert.ok(browser.success);
		 assert.equal(browser.text('h1'), 'Contact');
		 assert.equal(browser.text('div.alert'), 'Please fill in all the fields');
		 }).then(done, done);
	});
		 
	it('should keep values on partial submissions', function(done) {
        if (!before_successful) throw Exception("can't perform test");
		 var browser = this.browser;
		 browser.fill('first_name', 'John');
		 browser.pressButton('Send').then(function() {
		 assert.equal(browser.field('first_name').value, 'John');
		 }).then(done, done);
	});
		 
	it('should refuse invalid emails', function(done) {
        if (!before_successful) throw Exception("can't perform test");
		 var browser = this.browser;
		 browser.fill('first_name', 'John');
		 browser.fill('last_name', 'Doe');
		 browser.fill('email', 'incorrect email');
		 browser.fill('message', 'Lorem ipsum');
		 browser.pressButton('Send').then(function() {
		 assert.ok(browser.success);
		 assert.equal(browser.text('h1'), 'Contact');
		 assert.equal(browser.text('div.alert'), 'Please check the email address format');
		 }).then(done, done);
	});
		
	it('should accept complete submissions', function(done) {
        if (!before_successful) throw Exception("can't perform test");
		 var browser = this.browser;
		 browser.fill('first_name', 'John');
		 browser.fill('last_name', 'Doe');
		 browser.fill('email', 'test@example.com');
		 browser.fill('message', 'Lorem ipsum');
		 browser.pressButton('Send').then(function() {
		 assert.ok(browser.success);
		 assert.equal(browser.text('h1'), 'Message Sent');
		 assert.equal(browser.text('p'), 'Thank you for your message. We\'ll answer you shortly.');
		 }).then(done, done);
	});
	
	/* Closing TEST server */
	 after(function(done) {
		 this.server.close(done);
	});
});
