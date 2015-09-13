var UserData = angular.module('UserData', []);
UserData.directive('ngUser', function() {
    return{
    	restrict: 'E',
    	templateUrl: 'views/user.html',
		controller: ['$scope', 'Auth', function($scope, Auth) {
			$scope.loggedIn = false;
			$scope.user={};
			$scope.checkUser = function(){
				Auth.checkUser(function(data){
					console.log("checkUser: " + data);
					if (data != '401') {
						$scope.loggedIn = true;
						$scope.user = data;
					}
				});
			}
			$scope.logout = function(){
				$scope.loggedIn = false;
				$scope.user = {};
				Auth.logout();
			}
			$scope.checkUser();
	    }]
	};
});