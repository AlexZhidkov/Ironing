(function() {
    "use strict";

    var app = angular.module('app.orders', ['firebase.utils', 'firebase.auth', 'ngRoute']);

    app.controller('Orders', ['$rootScope', 'Auth', '$location', 'fbutil', 'orderList', 'user', 'logger',
        function($rootScope, Auth, $location, fbutil, orderList, user, logger) {
            var vm = this;
            vm.profile = $rootScope.profile;
            vm.orders = orderList;

        }
    ]);
    
  app.factory('orderList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('orders').limitToLast(50);
    return $firebaseArray(ref);
  }]);


    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/orders', {
            templateUrl: 'app/orders/orders.html',
            controller: 'Orders',
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
