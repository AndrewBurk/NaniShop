angular.module('NaniShop',['ngRoute','ItemCtrl','ContentServices','LoginCtrl','UserServices'])
    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider.
            when('/',{
                templateUrl: 'partials/itemslist.html',
                controller: 'ItemListCtrl',
                access: {restricted: false}
            }).
            when('/items/:item_id', {
                templateUrl:'partials/product-details.html',
                controller: 'ItemDetailCtrl',
                access: {restricted: false}
            }).
            when('/cart',{
                templateUrl: 'partials/cart.html',
                controller: 'CartCtrl',
                access: {restricted: false}
            }).
            when('/login',{
                templateUrl: 'partials/login.html',
                access: {restricted: false}
            }).
            when('/one',{
                access: {restricted: true}
            }).
            otherwise({
                redirectTo: '/',
                access: {restricted: false}
            });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]);

angular.module('NaniShop').run(function ($rootScope, $location, $route, UserServices) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.access.restricted && UserServices.isLoggedIn() === false) {
            $location.path('/login');
            $route.reload();
        }
    });
});