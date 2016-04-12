(function() {
    "use strict";

    var app = angular.module('app.login', ['firebase.utils', 'firebase.auth', 'ngRoute']);

    app.controller('Login', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {
        var vm = this;
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;

        $scope.signInWithProvider = function(provider) {
            $scope.err = null;
            Auth.$authWithOAuthPopup(provider, function(error, authData) {
                if (error) {
                    $scope.err = errMessage(error);
                } else {
                    console.log(authData);
                    $location.path('/orderForm');
                }
            });
        }

        $scope.signInAsGuest = function() {
            $scope.err = null;
            Auth.$authAnonymously(function(error) {
                if (error) {
                    $scope.err = errMessage(error);
                } else {
                    $location.path('/orderForm');
                }
            });
        }

        $scope.callPhone = function() {
            window.location.href = 'tel:+61406522097';
        }

        $scope.sendSms = function() {
            window.location.href = 'sms:+61406522097';
        }

        function errMessage(err) {
            return angular.isObject(err) && err.code ? err.code : err + '';
        }

    }]);
    
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'Login',
            resolve: {
                // forces the page to wait for this promise to resolve before controller is loaded
                // the controller can then inject `user` as a dependency. This could also be done
                // in the controller, but this makes things cleaner (controller doesn't need to worry
                // about auth status or timing of accessing data or displaying elements)
                user: ['Auth', function(Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        });
    }]);

})();
