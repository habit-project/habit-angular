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
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })
        .state('habits', {
            url: '/habits',
            templateUrl: 'views/habits.html',
            controller: 'HabitController'
        })
        .state('goals', {
            url: '/goals',
            templateUrl: 'views/goals.html',
            controller: 'GoalController'
        })
        .state('actions', {
            url: '/actions',
            templateUrl: 'views/actions.html',
            controller: 'ActionController'
        })
        .state('schedule', {
            url: '/schedule',
            templateUrl: 'views/schedule.html',
            controller: 'ScheduleController'
        });
}]);