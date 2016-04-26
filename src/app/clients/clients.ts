(function () {
    "use strict";

    var app = angular.module('app.clients', ['ngMaterial']);

    app.controller('Clients', ['$rootScope', 'clientList', '$mdDialog', '$mdMedia',
        function ($rootScope, clientList, $mdDialog, $mdMedia) {
            var vm = this;
            vm.profile = $rootScope.profile;
            vm.clients = clientList;
            vm.showAdvanced = showAdvanced;

            function showAdvanced(client) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) //&& $scope.customFullscreen;
                $mdDialog.show({
                    controller: ClientDialog,
                    controllerAs: 'vm',
                    templateUrl: 'app/clients/client-dialog.html',
                    parent: angular.element(document.body),
                    locals: { client: client },
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                    .then(function (answer) {
                        status = 'You said the information was "' + answer + '".';
                    }, function () {
                        status = 'You cancelled the dialog.';
                    });
                /*                    
                                $scope.$watch(function () {
                                    return $mdMedia('xs') || $mdMedia('sm');
                                }, function (wantsFullScreen) {
                                    $scope.customFullscreen = (wantsFullScreen === true);
                                });
                */
                function ClientDialog($scope, $mdDialog, client) {
                    var vm = this;
                    vm.client = client;

                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function (answer) {
                        $mdDialog.hide(answer);
                    };
                }

            };

        }
    ]);

    app.factory('clientList', ['fbutil', '$firebaseArray', function (fbutil, $firebaseArray) {
        var ref = fbutil.ref('users');
        return $firebaseArray(ref);
    }]);


    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.whenAuthenticated('/clients', {
            templateUrl: 'app/clients/clients.html',
            controller: 'Clients',
            controllerAs: 'vm',
            resolve: {
                // forces the page to wait for this promise to resolve before controller is loaded
                // the controller can then inject `user` as a dependency. This could also be done
                // in the controller, but this makes things cleaner (controller doesn't need to worry
                // about auth status or timing of accessing data or displaying elements)
                user: ['Auth', function (Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        });
    }]);

})();
