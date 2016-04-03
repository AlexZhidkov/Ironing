"use strict";
angular.module('app.login', ['firebase.utils', 'firebase.auth', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'login/login.html'
        });
    }])
    .controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', function ($scope, Auth, $location, fbutil) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;
        $scope.login = function (email, pass) {
            $scope.err = null;
            Auth.$authWithPassword({ email: email, password: pass }, { rememberMe: true })
                .then(function () {
                $location.path('/account');
            }, function (err) {
                $scope.err = errMessage(err);
            });
        };
        $scope.createAccount = function () {
            $scope.err = null;
            if (assertValidAccountProps()) {
                var email = $scope.email;
                var pass = $scope.pass;
                Auth.$createUser({ email: email, password: pass })
                    .then(function () {
                    return Auth.$authWithPassword({ email: email, password: pass });
                })
                    .then(function (user) {
                    var ref = fbutil.ref('users', user.uid);
                    return fbutil.handler(function (cb) {
                        ref.set({ email: email, name: name || firstPartOfEmail(email) }, cb);
                    });
                })
                    .then(function () {
                    $location.path('/account');
                }, function (err) {
                    $scope.err = errMessage(err);
                });
            }
        };
        $scope.signInWithProvider = function (provider) {
            $scope.err = null;
            Auth.$authWithOAuthPopup(provider, function (error, authData) {
                if (error) {
                    $scope.err = errMessage(error);
                }
                else {
                    $location.path('/account');
                }
            });
        };
        $scope.signInAsGuest = function () {
            $scope.err = null;
            Auth.$authAnonymously(function (error) {
                if (error) {
                    $scope.err = errMessage(error);
                }
                else {
                    $location.path('/account');
                }
            });
        };
        $scope.callPhone = function () {
            window.location.href = 'tel:+61406522097';
        };
        $scope.sendSms = function () {
            window.location.href = 'sms:+61406522097';
        };
        function assertValidAccountProps() {
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
            }
            else if (!$scope.pass || !$scope.confirm) {
                $scope.err = 'Please enter a password';
            }
            else if ($scope.createMode && $scope.pass !== $scope.confirm) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }
        function errMessage(err) {
            return angular.isObject(err) && err.code ? err.code : err + '';
        }
        function firstPartOfEmail(email) {
            return ucfirst(email.substr(0, email.indexOf('@')) || '');
        }
        function ucfirst(str) {
            str += '';
            var f = str.charAt(0).toUpperCase();
            return f + str.substr(1);
        }
    }]);
//# sourceMappingURL=login.js.map