// public/js/controllers/MainCtrl.js
var MainCtrl =angular.module('MainCtrl', []);
MainCtrl.controller('MainController', ['$scope','$http','Auth',function($scope,$http, Auth) {
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