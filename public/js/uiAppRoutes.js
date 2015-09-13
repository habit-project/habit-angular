// public/js/uiAppRoutes.js
    var uiAppRoutes = angular.module('uiAppRoutes', ['ui.router']);
    uiAppRoutes.config(['$locationProvider','$stateProvider', '$urlRouterProvider',function($locationProvider, $stateProvider, $urlRouterProvider) {
    
    
    $locationProvider.html5Mode(true);
    $stateProvider

        // home page
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        });
}]);