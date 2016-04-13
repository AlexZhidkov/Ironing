(function() {
    "use strict";

    angular
        .module('app.orderForm')
        .controller('OrderForm', OrderForm);

    /**
     * @ngInject
     */
    function OrderForm($rootScope, Auth, $location, fbutil, user, logger) {
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
})();
