(function() {
    "use strict";

    var app = angular.module('app.orderForm', ['firebase.utils', 'firebase.auth', 'ngRoute']);

    app.controller('OrderForm', ['$rootScope', 'Auth', '$location', 'fbutil', 'user', 'logger',
        function($rootScope, Auth, $location, fbutil, user, logger) {
            var vm = this;
            vm.profile = $rootScope.profile;
            vm.submitOrder = submitOrder;

            function submitOrder() {
                fbutil.ref('orders').push({
                    'clientId': user.uid,
                    'name': $rootScope.profile.name,
                    'email': $rootScope.profile.email,
                    'phone': $rootScope.profile.phone,
                    'address': $rootScope.profile.address,
                    'message': vm.message,
                    'status': 'submitted',
                    'assignedTo': 'manager'
                }, function(error) {
                    if (error) {
                        logger.error('Order failed', error, 'Error');
                    }
                    else {
                        logger.success('New order submitted', vm, 'Saved');
                    }
                });
            }

        }
    ]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.whenAuthenticated('/orderForm', {
            templateUrl: 'app/order-form/order-form.html',
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
