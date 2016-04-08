//ToDo AZ doesn't work
(function() {
    'use strict';
    
    angular
        .module('app.login')
        .run(routeConfig);

    //routeConfig.$inject = ['routehelper'];

    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    templateUrl: 'app/login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'login',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-login"></i> Login'
                    }
                }
            }
        ];
    }
})();
