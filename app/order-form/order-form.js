(function() {
    "use strict";

    var app = angular.module('app.orderForm', ['firebase.utils', 'firebase.auth', 'ngRoute']);

    app.controller('OrderForm', ['$scope', 'Auth', '$location', 'fbutil', 'user', 'logger',
        function($scope, Auth, $location, fbutil, user, logger) {
            var vm = this;
            vm.submitOrder = submitOrder;

            function submitOrder() {
                fbutil.ref('orders').push({
                    'clientId': user.uid,
                    'name': vm.name,
                    'email': vm.email,
                    'phone': vm.phone,
                    'address': vm.address,
                    'message': vm.message
                }, function (error) {
                    if(error){
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