(function() {
    'use strict';

    angular
        .module('app.orderForm')
        .run(routeConfig);

    //routeConfig.$inject = ['routehelper'];

    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/orderForm',
                config: {
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
                }
            }
        ];
    }
})();

// AZ ToDo implement whenAuthenticated
/*
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
*/