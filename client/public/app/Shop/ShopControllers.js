Array.prototype.removeValue = function(name, value){
    var array = $.map(this, function(v,i){
        return v[name] === value ? null : v;
    });
    this.length = 0; //clear original array
    this.push.apply(this, array); //push all elements except the one we want to delete
};

var ShopCtrl = angular.module('ShopCtrl', []);

ShopCtrl.controller('MainCtrl',['$scope','Cart',function($scope,Cart){
    $scope.cart=[];

    $scope.User = {
        cart: [],
        totalCount: Number,
        username: '',
        userrole: ''
    };

    $scope.User.getCount = function(item_id){
      return $scope.User.cart[item_id];
    };

    $scope.isLoggedIn = function(){
        return $scope.User.username === '' ? false: true;
    }

    $scope.isAdmin = function(){
        return $scope.User.userrole === 'admin' ? true: false;
    }

    Cart.getCart().
        success(function(data){
            $scope.User.cart = data;
            $scope.User.totalCount = SumItemsInCart(data);
        });

    $scope.toCart = function(item_id,citem){
        console.log('sdfsdfsd '+($scope.User.cart[item_id] - citem));
        if($scope.User.cart[item_id] + citem < 0){
            $scope.cart.removeValue('_id',item_id);
        }
        Cart.toCart(item_id,citem)
            .success(function(data){
                $scope.User.cart = data;
                $scope.User.totalCount = SumItemsInCart(data);
            })

    };


}])
.controller('ItemListCtrl', ['$scope','$http','Items', function ($scope,$http,Items) {
        Items.getAllItems()
            .success(function(data){
                $scope.items = data;
            });

        $scope.saveItem = function(item,item_id){
            console.log(item);
            angular.extend(item,{_id : item_id});
            Items.updateItem(item).success(function(data){
                //добавить обработку респонда
            });
        };

        $scope.addItem = function(){
            $scope.inserted = {
                id: $scope.items.length+1,
                name: '',
                status: null,
                group: null
            };
            $scope.items.push($scope.inserted);
        }

        $scope.removeItem = function(item_id){
            $scope.items.splice(item_id, 1);
            Items.deleteItem(item_id);
        }

}])
.controller('ItemDetailCtrl', ['$scope','$http','$stateParams','Items', function($scope, $http, $stateParams,Items) {
        Items.getItem($stateParams.item_id)
            .success(function(data){
                $scope.items = data;
            });
        $scope.ItemCount = 1;

}])
.controller('CartCtrl', ['$scope','$http','Items','Cart',function($scope, $http, Items,Cart) {
        Items.getItemsFromCart()
            .success(function(data){
                for(var i= 0;i<data.length; i++){
                    $scope.cart.push({'_id':data[i]._id,'name':data[i].name,'item_detail': data[i]});
                }

            });
}]);


var SumItemsInCart = function(arr){
    //for(var i= 0, sum = 0; i < arr.length; sum += arr[i++].count);
    var sum = 0;
    for(var key in arr){
        sum += arr[key];
    }
    return sum;
};
