var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');

var accountHandler = require('./AccountsHandler');

var app = express();
app.use(express.static(__dirname + '/public')); // static resources
app.set('view engine', 'jade'); // JADE template engine
//app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

module.exports = app;


/* POST signin page. */
app.post("/signin",
    bodyParser.urlencoded(),
    function(req, res, next) {
      console.log("In app.post()");
        
        // check that the request's body was as expected
        if (!req.body) 
        {
        	return next('route'); // or next(new Error('...'));
        }
        
        var email = req.body.email;
        var account = req.body.account;
        console.log('Email: ' + email + '  Account: ' + account);
        
        res.send('Do the creation of the account. Return to homepage and logged in.');
    });

/*
app.post('/signin', function(req, res) {
  
  bodyParser.urlencoded(),

  var email, account;

  /*busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
   */

 //  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
     // if fieldname = "email"
     //   email = inspect(val);
     // if fieldname = "account"
     //   account = inspect(val);
     //      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
   // console.log("fieldname: " + fieldname); 
   // });
    
    /*
    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });
*/
    // Set our internal DB variable
    //var db = req.db;

    // Get our form values. These rely on the "name" attributes
    //var userAccount = req.body.account;
    //var userEmail = req.body.email;

    // Set our collection
   // var collection = db.get('usercollection');

    // Submit to the DB
    /*
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            //res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
    */
//});

/* GET login page. */
app.get('/login', function(req, res) {
    res.render('login');     
    //res.send('Show the page to login.');
});

/* POST login page. */
app.post("/login",
    bodyParser.urlencoded(),
    function(req, res, next) {
		var fValid = new Boolean(false);

      console.log("In app.post(/login)");
        
        // check that the request's body was as expected
        if (!req.body) 
        {
        	return next('route'); // or next(new Error('...'));
        }
        
        var username = req.body.username;
        var password = req.body.password;
        console.log('Username: ' + username + '  Password: ' + password);
        
        // check username and password
      	var aoAccounts = accountHandler.getAccounts();
    	  console.log(aoAccounts);
        var accountID = accountHandler.getAccountID(username, password);
        if (!accountID)
    	  fValid = Boolean(true);
        if (fValid) {
        	 res.send('Do the login of the account. Return to homepage.');
        }
        else {
        	res.send('Inform that the login did not succeeded. Return to the login form.'); 	
        }
        
       
    });

/*
/* GET signin page. */
app.get('/signin', function(req, res) {
    res.render('signin');     
    //res.send('Show the page to signin.');
});

/* GET assessment creation page. */
app.get('/createAssessment', function(req, res) {
    res.render('createAssessment');     
    //res.send('Show the page to create an assessment.');
});

/* GET assessment participation page. */
app.get('/participateAssessment', function(req, res) {
    res.render('participateAssessment');     
    //res.send('Show the page to participate in an assessment.');
});

/* GET home page. */
app.get('/', function(req, res) {
    res.render('index');     
    //res.send('Hello World!');
});

if (!module.parent) // If no module (meaning invoked directly)
{
    console.log('module.parent is empty');

	var server = app.listen(3000, function () {
		  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
		});
}
//module.exports = router;
