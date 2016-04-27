(function() {
    'use strict';

    angular.module('app', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.dashboard tries to use app.data,
         * its components are available.
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'ngMaterial',
        'app.core',

        /*
         * Feature areas
         */
        'app.config',
        'app.security',
        'app.account',
        'app.layout',
        'app.login',
        'app.orders',
        'app.clients',
        'app.orderItem',
        'app.orderForm'
    ])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/orderForm'
            });
        }])

        .run(['$rootScope', '$location', 'Auth', 'loginRedirectPath', 'orderFormRedirectPath', 'fbutil', '$firebaseObject',
            function($rootScope, $location, Auth, loginRedirectPath, orderFormRedirectPath, fbutil, $firebaseObject) {
                var unbind;
                // track status of authentication
                Auth.$onAuth(function(user) {
                    $rootScope.loggedIn = !!user;
                    if ($rootScope.loggedIn) {
                        var profile = $firebaseObject(fbutil.ref('users', user.uid));
                        profile.$bindTo($rootScope, 'profile').then(function(ub) {
                            unbind = ub;
                        });

                        //$location.path(orderFormRedirectPath);
                    }
                    else {
                        if (unbind) { unbind(); }
                        $location.path(loginRedirectPath);
                    }

                });

            }]);

})();
