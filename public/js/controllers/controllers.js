var ItemCtrl = angular.module('ItemCtrl', []);

ItemCtrl.controller('MainCtrl',function($scope){

            $scope.global = {cart: '',
            user:''};

})
.controller('ItemListCtrl', ['$scope','$http','Items','Cart', function ($scope,$http,Items,Cart) {
    Items.getItems()
        .success(function(data){
            $scope.items = data;
        });

    $scope.toCart = function(item){
        Items.toCart(item)
            .success(function(data){
                $scope.global.cart = data;
            });

    };
    Cart.getCart().
        success(function(data){
            $scope.global.cart = data;
        });
}])
.controller('ItemDetailCtrl', ['$scope','$http', '$routeParams','Cart', function($scope, $http, $routeParams,Cart) {
    Cart.getCart().
        success(function(data){
            $scope.global.cart = data;
        });
}]);