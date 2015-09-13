var path = require('path');
module.exports=function(app,mongod,passport){// =====================================

    var User = require('../models/user.js');
    var Google = require('../../google.js');
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email','https://www.googleapis.com/auth/youtube.readonly'],accessType: 'offline' }));


    app.post('/auth/local', passport.authenticate('local-signup'), function (req, res){
        res.json(req.user);
    });
    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google'), function (req,res){
           //res.send(req.user);
            Google.refreshGoogleToken(req.user.refreshToken, function (newToken){
                if (newToken == 401){
                    console.log("Couldn't get refresh token");
                }
                else {
                    User.findOne({ 'email': req.user.email }, function(err, user) {
                        if (err)
                            res.send(err);
                        console.log("updateToken");
                        user.googleToken = newToken;  // update the bears info
                        req.user.googleToken = user.googleToken;
                        // save the bear
                        user.save(function(err) {
                            if (err)
                                res.send(err);
                        });
                    }); 
                }
            });
            res.redirect('http://localhost:3000/goals');
        }
    );
    app.get('/loggedin', function (req, res){
        if (req.isAuthenticated()){
            res.send(req.user);
        }
        else {
            res.send('401');
        }
    });
    app.get('/checkadmin',  function (req, res){
        if (req.isAuthenticated()){
            if (req.user.role == "Admin"){
                res.send(req.user);
            }
            else {
                res.send('401');
            }
        }
        else {
            res.send('401');
        }
    });
    app.get('/logout', function (req, res){
        req.logout();
        //res.json('User logged out');
        res.redirect('/');
    });
};