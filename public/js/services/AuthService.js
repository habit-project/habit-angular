var AuthService = angular.module('AuthService', []);
AuthService.factory('Auth', ['$location','$http', function($location,$http) {
    return{
    	checkUser: function (callback) {
    		console.log("Calling checkUser");
    		$http.get('http://localhost:3000/loggedin')
	    		.success(function(data) {
	            	if (data=='401'){
	            		callback('401');
	            		//$location.url('/login');
	            		//$location.path('/login');
	            	}
	            	else
	            	{
	            		callback(data);
	            	}
	        	});
		},
		logout: function(){
			$http.get('http://localhost:3000/logout')
	    		.success(function(data) {
	            	$location.url('/login');
	            	$location.path('/login');
	            	$location.replace();
	        	});
		}
	}
}]);