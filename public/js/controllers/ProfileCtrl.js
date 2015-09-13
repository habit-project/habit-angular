// public/js/controllers/ProfileCtrl.js
var ProfileCtrl =angular.module('ProfileCtrl', []);
ProfileCtrl.controller('ProfileController', ['$scope','$http','Auth',function($scope,$http, Auth) {
	Auth.checkUser(function(data){
		if (data != '401') {
			$scope.user = data;
		}
	});
}]);