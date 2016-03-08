var naniShop = angular.module('NaniShop',['ui.router','xeditable','Api'])
    .config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                abstract:true,
                templateUrl: 'partials/shop/main.html',
                controller: storeController,
                access: {restricted: false}
            }).
            state('main.allitems', {
                url: '',
                templateUrl:'partials/shop/itemslist.html',
                controller: storeController,
                access: {restricted: false}
            }).
            state('main.item_id',{
                url:'items/:item_id',
                templateUrl:'partials/shop/product-details.html',
                controller: storeController,
                access: {restricted: false}
            }).
            state('main.cart',{
                url: 'cart',
                templateUrl: 'partials/shop/cart.html',
                controller: storeController,
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
                controller: storeController,
                access: {restricted: false}
            })

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]);


angular.module('NaniShop').run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

naniShop.factory('DataService',['Items',function(Items){
    var naniShopStore = new Store(),
        naniShopCart = new ShoppingCart('NaniShopCart'),
        items;

    Items.getAllItems()
        .success(function (items) {
            naniShopStore.loadProducts(items);
        });

    return{
        store: naniShopStore,
        cart: naniShopCart
    };
}]);
