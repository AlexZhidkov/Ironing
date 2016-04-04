(function() {
    'use strict';

    angular
        .module('app.orderForm')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/orderform',
                config: {
                    templateUrl: 'order-form/order-form.html',
                    title: 'orderForm',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-document"></i> Order Form'
                    }
                }
            }
        ];
    }
})();