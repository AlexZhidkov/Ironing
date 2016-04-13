(function() {
    'use strict';
    
    angular
        .module('app.orderForm')
        .config(orderFormRoute);

    /* @ngInject */
    function orderFormRoute($routeProvider) {
         $routeProvider.whenAuthenticated('/orderForm', {
             templateUrl: 'app/order-form/order-form.html',
             controller: 'OrderForm',
             controllerAs: 'vm',
             resolve: {
                 user: ['Auth', function(Auth) {
                     return Auth.$waitForAuth();
                 }]
             }
         });
    }
})();
