angular.module('NaniShop',['ui.router','xeditable','ShopCtrl','ShopServices','AuthCtrl','UserServices'])
.config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                abstract:true,
                templateUrl: 'partials/shop/main.html',
                controller: 'MainCtrl',
                access: {restricted: false}
            }).
            state('main.allitems', {
                url: '',
                templateUrl:'partials/shop/itemslist.html',
                controller: 'ItemListCtrl',
                access: {restricted: false}
            }).
            state('main.item_id',{
                url:'items/:item_id',
                templateUrl:'partials/shop/product-details.html',
                controller: 'ItemDetailCtrl',
                access: {restricted: false}
            }).
            state('main.cart',{
                url: 'cart',
                templateUrl: 'partials/shop/cart.html',
                controller: 'CartCtrl',
                access: {restricted: false}
                }).
            state('main.login',{
                url: 'login',
                templateUrl: 'partials/shop/login.html',
                access: {restricted: false}
                }).
            state('admin',{
                url: '/admin',
                templateUrl: 'partials/admin/index.html',
                access: {restricted: false}
            }).
            state('admin.items',{
                url: '/itemscontrol',
                templateUrl: 'partials/admin/itemscontrol.html',
                controller: 'ItemListCtrl',
                access: {restricted: false}
            })

            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
    }]);

angular.module('NaniShop').run(function ($rootScope, $state, UserServices) {
    $rootScope.$on('$stateChangeStart', function (event, next, current) {
        if (next.access.restricted && (UserServices.isLoggedIn() === false)) {
            event.preventDefault();
            $state.go('main.login');
        }
    });
});

angular.module('NaniShop').run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});





//.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
//    $routeProvider.
//        when('/',{
//            templateUrl: 'partials/itemslist.html',
//            controller: 'ItemListCtrl',
//            access: {restricted: false}
//        }).
//        when('/items/:item_id', {
//            templateUrl:'partials/product-details.html',
//            controller: 'ItemDetailCtrl',
//            access: {restricted: false}
//        }).
//        when('/cart',{
//            templateUrl: 'partials/cart.html',
//            controller: 'CartCtrl',
//            access: {restricted: false}
//        }).
//        when('/login',{
//            templateUrl: 'partials/login.html',
//            access: {restricted: false}
//        }).
//        when('/admin',{
//            redirectTo: '/admin/'
//        }).
//        otherwise({
//            redirectTo: '/',
//            access: {restricted: false}
//        });
//    $locationProvider.html5Mode(true);
//    $locationProvider.hashPrefix('!');
//}]);

//angular.module('NaniShop').run(function ($rootScope, $location, $route, UserServices) {
//    $rootScope.$on('$routeChangeStart', function (event, next, current) {
//        if (next.access.restricted && UserServices.isLoggedIn() === false) {
//            $location.path('/login');
//            $route.reload();
//        }
//    });
//});