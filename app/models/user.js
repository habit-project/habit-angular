// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
// define the schema for our user model
var userSchema = new Schema({
        userId       : String,
        googleToken        : String,
        googleRefreshToken : String,
        spotifyToken: String,
        spotifyRefreshToken: String,
        spotifyId: String,
        email        : String,
        name         : String,
        password	 : String
});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);