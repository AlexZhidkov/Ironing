(function() {
    "use strict";

    var app = angular.module('app.orderItem', ['ngMaterial']);

    function OrderItem($mdDialog, driverList) {
        var vm = this;
        vm.openMenu = openMenu;
        vm.drivers = driverList;

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

    app.factory('driverList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
        var ref = fbutil.ref('users').orderByChild("role").equalTo('driver');
        return $firebaseArray(ref);
    }]);

})();
