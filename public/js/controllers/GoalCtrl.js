// public/js/controllers/GoalCtrl.js
var GoalCtrl =angular.module('GoalCtrl', []);
GoalCtrl.controller('GoalController', ['$scope','$http','Auth',function($scope,$http, Auth) {
	$scope.loggedIn = Auth.loggedIn;
	$scope.user = Auth.user;
	/*$scope.loggedIn = false;
	$scope.user={};
	$scope.checkUser = function(){
		Auth.checkUser(function(data){
			console.log("checkUser: " + data);
			if (data != '401') {
				$scope.loggedIn = true;
				$scope.user = data;
			}
		});
	}*/
	
}]);