// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;

var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// configuration ===============================================================
 // connect to our database

var mongod = require('./db.js');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'run the matrix',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/passport')(passport); // pass passport for configuration
require('./app/routes/auth-routes')(app, mongod, passport);
require('./app/routes/user-routes')(app, mongod);
app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, './public','index.html')); // load our public/index.html file
  });
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
module.exports.app = app;