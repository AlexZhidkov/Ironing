(function() {
    "use strict";

    var app = angular.module('app.orderItem', []);

    function OrderItem() {
        var vm = this;
    }

    app.component('orderItem', {
        templateUrl: 'app/orders/order-item.html',
        controller: OrderItem,
        controllerAs: 'vm',
        bindings: {
            order: '='
        }
    });

})();
