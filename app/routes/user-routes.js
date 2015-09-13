var User = require('../models/user.js');
var Admin = require('../../admin.js');
var UserMethods = require('../../user.js');
var path = require('path');

module.exports=function(app,mongod){
    app.get('/api/users', Admin.getUsers, function(req, res){
        res.send(req.result);
    });

    app.post('/api/users', UserMethods.createUser, function(req, res) {
        res.send(req.result);
    });

    app.route('/api/users/:_id')
    // get the user with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(UserMethods.findUserByID, function(req, res) {
        res.send(req.result);
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(UserMethods.updateUser, function(req, res) {
        res.send(req.result);
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(UserMethods.deleteUser, function(req, res) {
        res.send(req.result);
    });
}
