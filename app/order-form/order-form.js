(function() {
    'use strict';

    angular
        .module('app.orderForm')
        .controller('OrderForm', OrderForm);

    OrderForm.$inject = ['$q', 'dataservice', 'logger'];

    function OrderForm($q, dataservice, logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'OrderForm';

        activate();

        function activate() {
            logger.info('Activated OrderForm View');
        }

    }
})();
