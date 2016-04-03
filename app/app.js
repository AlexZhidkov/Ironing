'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
    'ngMaterial',
    'app.core',
    'app.config',
    'app.security',
    'app.home',
    'app.account',
    'app.chat',
    'app.login'
  ])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/login'
    });
  }])
  
  .run(['$rootScope', 'Auth', function($rootScope, Auth) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);
