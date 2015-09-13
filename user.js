var User = require('./app/models/user.js');

exports.findUserByID = function(req, res, next){
	var userID = req.params._id;
	User.findById(userID, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}

exports.createUser = function(req, res, next){
	var user = new User();
    user.name = req.body.name || "Anonymous";
    user.email = req.body.email || "Anomnymous";
    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);
        res.json(user);
    });   
}

exports.updateUser = function(req, res, next){
	var userID = req.params._id;
	User.findById(userID, function(err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;  // update the bears info
        // save the bear
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
}

exports.deleteUser = function(req, res, next) {
	User.remove({
    	_id: req.params._id
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({message: "User successfully deleted"});
    });
}