(function() {
    "use strict";

    var app = angular.module('app.orderItem', ['ngMaterial']);

    function OrderItem($mdDialog) {
        var vm = this;
        vm.openMenu = openMenu;
        
        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
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
