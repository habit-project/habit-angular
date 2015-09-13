// public/js/services/ProjectService.js
var UserService = angular.module('UserService', [])
UserService.factory('User', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function(callback) {
            $http.get('http://localhost:3000/api/users')
            .success(function(data) {
                callback(data);
            }); 
        }
    };       

}]);