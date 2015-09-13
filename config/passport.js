// config/passport.js

// load all the things we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;

// load up the user model
var User = require('../app/models/user.js');

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new SpotifyStrategy({
        clientID        : configAuth.spotifyAuth.clientID,
        clientSecret    : configAuth.spotifyAuth.clientSecret,
        callbackURL     : configAuth.spotifyAuth.callbackURL,
        passReqToCallback : true
      },
      function(req, token, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            if (req.user){
                User.findOne({ 'email' : req.user.email }, function(err, user) {
                    if (err)
                            return done(err);
                    if (user) {
                        user.spotifyToken = token;
                        req.user.spotifyToken = token;
                        if (refreshToken !== undefined){
                            user.spotifyRefreshToken = refreshToken;
                            req.user.spotifyRefreshToken = refreshToken;
                        }
                        user.save(function(err) {
                            if (err)
                                throw err;
                            console.log("Passport, Spotify, req.user: " + req.user);
                            return done(null, req.user);

                        });
                    }
                });
            }
            else {
                console.log("Passport, Spotify, profile: " + profile);
                User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        user.spotifyToken = token;
                        if (refreshToken !== undefined){
                            user.spotifyRefreshToken = refreshToken;
                        }
                        user.save(function(err) {
                            if (err)
                                throw err;
                            console.log("Passport, Spotify, user: " + user);
                            return done(null, user);
                        });
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();

                        // set all of the relevant information

                        newUser.userId = profile.id;
                        newUser.spotifyToken = token;
                        newUser.spotifyId = profile.id;
                        if (refreshToken !== undefined){
                            newUser.spotifyRefreshToken = refreshToken;
                        }
                        newUser.name  = profile.displayName || profile.emails[0].value;
                        newUser.email = profile.emails[0].value; // pull the first email
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            console.log("Passport, Spotify, new user: " + newUser);
                            return done(null, newUser);
                        });
                    }
                });
            }
        });
      }));
    
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            if (req.user){
                User.findOne({ 'email' : req.user.email }, function(err, user) {
                    if (err)
                            return done(err);
                    if (user) {
                        user.googleToken = token;
                        req.user.googleToken = token;
                        if (refreshToken !== undefined){
                            user.googleRefreshToken = refreshToken;
                            req.user.googleRefreshToken = refreshToken;
                        }
                        user.save(function(err) {
                            if (err)
                                throw err;
                            console.log("Passport, Google, req.user: " + req.user);
                            return done(null, req.user);
                        });
                    }
                });
            }
            else {
                console.log("Passport, Google, profile: " + profile);
                User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        user.googleToken = token;
                        if (refreshToken !== undefined){
                            user.googleRefreshToken = refreshToken;
                        }
                        user.save(function(err) {
                            if (err)
                                throw err;
                            console.log("Passport, Google, user: " + user);
                            return done(null, user);
                        });
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();

                        // set all of the relevant information

                        newUser.userId = profile.id;
                        newUser.googleToken = token;
                        if (refreshToken !== undefined){
                            newUser.googleRefreshToken = refreshToken;
                        }
                        newUser.name  = profile.displayName;
                        newUser.email = profile.emails[0].value; // pull the first email
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            console.log("Passport, Google, new user: " + newUser);
                            return done(null, newUser);
                        });
                    }
                });
            }
        });
    }));
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                user.password = password;
                user.save(function(err){
                    if (err)
                        throw err;
                    return done(null, user);
                });
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
            });    
        });
    }));
};