(function() {
    "use strict";

    var app = angular.module('app.orderItem', ['ngMaterial']);

    function OrderItem($mdDialog, driverList, fbutil) {
        var vm = this;
        vm.openMenu = openMenu;
        vm.drivers = driverList;
        vm.assignDriver = assignDriver;

        function openMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        function assignDriver(driver) {
            console.log(this.order.$id);
            fbutil.ref('orders', this.order.$id, 'status').set('Driver to pickup', done);
            fbutil.ref('orders', this.order.$id, 'assignedToId').set(driver.$id, done);
            fbutil.ref('orders', this.order.$id, 'assignedToName').set(driver.$value, done);
        }

        function done(error: any) {
            if (error) {
                throw new Error('Error assigning pick up driver: ' + error);
            }
        }
    }

    app.component('orderItem', {
        templateUrl: 'app/orders/order-item.html',
        controller: OrderItem,
        controllerAs: 'vm',
        bindings: {
            order: '='
        }
    });

    app.factory('driverList', ['fbutil', '$firebaseArray',
        function(fbutil, $firebaseArray) {
            var ref = fbutil.ref('roles/drivers');
            return $firebaseArray(ref);
        }]);

})();
