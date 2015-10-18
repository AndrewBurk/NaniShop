angular.module('NaniShop',['ngRoute','ItemCtrl','ContentServices'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/',{
                templateUrl: '/itemslist.html',
                controller: 'ItemListCtrl'
            }).
            when('/items/:itemname', {
                templateUrl:'/product-details.html',
                controller: 'ItemDetailCtrl'
            }).
            otherwise({
                redirectTo: '/index.html'
            });
    }]);