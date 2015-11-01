var ItemCtrl = angular.module('ItemCtrl', []);

ItemCtrl.controller('MainCtrl',['$scope','Cart',function($scope,Cart){

    $scope.User = {
        cart: [],
        totalCount: String,
        username: ''
    };

    $scope.User.getCount = function(item_id){
      return $scope.User.cart[item_id];
    };

    $scope.isLoggedIn = function(){
        return $scope.User.username === '' ? false: true;
    }

    Cart.getCart().
        success(function(data){
            //$scope.User.cart = ArrToMap(data);
            $scope.User.cart = data;
            $scope.User.totalCount = SumItemsInCart(data);
        });

    $scope.toCart = function(item_id){
        Cart.toCart(item_id)
            .success(function(data){
                //$scope.User.cart = ArrToMap(data);
                $scope.User.cart = data;
                $scope.User.totalCount = SumItemsInCart(data);
            });
    };


}])
.controller('ItemListCtrl', ['$scope','$http','Items', function ($scope,$http,Items) {
        Items.getAllItems()
            .success(function(data){
                $scope.items = data;
            });

}])
.controller('ItemDetailCtrl', ['$scope','$http','$routeParams','Items', function($scope, $http, $routeParams,Items) {
        Items.getItem($routeParams.item_id)
            .success(function(data){
                $scope.items = data;
            });

}])
.controller('CartCtrl', ['$scope','$http','Items',function($scope, $http, Items) {
        Items.getItemsFromCart(getItem_ids($scope.User.cart))
            .success(function(data){
                console.log('RERERE'+data);
                //var i = 0;
                $scope.cart=[];
                for(var i= 0;i<data.length; i++){
                    $scope.cart.push({'item_detail': data[i],'count': $scope.User.cart[data[i]._id]});
                    //$scope.items[i++].count=$scope.User.cart[item.item_id];
                }

            });

}]);


var getItem_ids = function(arr){
    var keys = [];
    for(var key in arr){
        keys.push(key);
    };
    return keys;
}

var SumItemsInCart = function(arr){
    //for(var i= 0, sum = 0; i < arr.length; sum += arr[i++].count);
    var sum = 0;
    for(var key in arr){
        sum += arr[key];
    }
    return sum;
};