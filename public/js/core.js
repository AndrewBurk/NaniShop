angular.module('NaniShop',['ngRoute','ItemCtrl','ContentServices'])
    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider.
            when('/',{
                templateUrl: '/itemslist.html',
                controller: 'ItemListCtrl'
            }).
            when('/items/:item_id', {
                templateUrl:'/product-details.html',
                controller: 'ItemDetailCtrl'
            }).
            when('/cart',{
                templateUrl: '/cart.html',
                controller: 'CartCtrl'
            }).
            when('/login',{
                templateUrl: '/login.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]);