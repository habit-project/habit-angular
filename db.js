var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url, function(err) {
    if (err) {
    	console.log("Could not connect to mongo server!");
  		return console.log(err);
  	}
});
var mongod = mongoose.createConnection('localhost','habit-project');
mongod.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

mongod.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

module.exports.mongod = mongod;