var mongoose = require('mongoose');
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var util = require('util');

var User = require('./app/models/user.js');
var configAuth = require('./config/auth.js');
var clientId = configAuth.googleAuth.clientID;
var clientSecret = configAuth.googleAuth.clientSecret;

exports.refreshGoogleToken = function(refreshToken, callback){
    
    var options = {
        host: 'www.googleapis.com',
        path: '/oauth2/v3/token',
        method: 'POST',
        headers:
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    var dataString = querystring.stringify({
        'refresh_token': refreshToken,
        'client_id': clientId,
        'client_secret': clientSecret,
        'grant_type': 'refresh_token'
    });
    var request = https.request(options,function(response){
        var data ='';
        response.on('data',function(chunk){
            data+=(chunk);
        });
        response.on('end', function() {
            if (response.statusCode == 401){
                return callback(401);
            }
            else {
                callback(JSON.parse(data).access_token);
            }
        });
    });
    request.write(dataString);
    request.end();
};