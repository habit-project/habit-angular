// public/js/controllers/ActionCtrl.js
var ActionCtrl =angular.module('ActionCtrl', []);
ActionCtrl.controller('ActionController', ['$scope','$http','Auth',function($scope,$http, Auth) {
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