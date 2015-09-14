var AuthService = angular.module('AuthService', []);
AuthService.factory('Auth', ['$location','$http', function($location,$http) {
	var loggedIn = false;
    var user = {};
	var checkUser = function (callback) {
		//alert("Check user")
	$http.get('http://localhost:3000/loggedin')
		.success(function(data) {
        	if (data!='401'){
        		callback(data);
        	}
    	});
	};
	var logout = function(){
		$http.get('http://localhost:3000/logout')
    		.success(function(data) {
            	$location.url('/');
            	$location.path('/');
            	$location.replace();
        	});
	};
	//checkUser();
    return{
    	loggedIn: loggedIn,
    	user: user,
    	logout: logout,
    	checkUser: checkUser
	};
}]);