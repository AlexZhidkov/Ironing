(function() {
    "use strict";

    var app = angular.module('app.orderForm', ['firebase.utils', 'firebase.auth', 'ngRoute']);

    app.controller('OrderForm', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {
        var vm = this;
    }]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/orderForm', {
            templateUrl: 'order-form/order-form.html',
            controller: 'OrderForm',
            controllerAs: 'vm',
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