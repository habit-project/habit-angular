// public/js/controllers/ProfileCtrl.js
var ProfileCtrl =angular.module('ProfileCtrl', []);
ProfileCtrl.controller('ProfileController', ['$scope','$http','Auth',function($scope,$http, Auth) {
	$scope.loggedIn = Auth.loggedIn;
	$scope.user = Auth.user;
	/*Auth.checkUser(function(data){
		if (data != '401') {
			$scope.user = data;
		}
	});*/
}]);