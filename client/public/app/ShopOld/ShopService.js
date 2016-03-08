var ShopServices = angular.module('ShopServices',[]);

ShopServices.factory('Items',['$http',function($http){
        return {
            getAllItems : function(){
                return $http.get('/api/items');
            },
            updateItem : function(item){
                return $http.post('/api/items',item);
            },
            deleteItem : function(item_id){
                return $http.delete('/api/items',item_id);
            },
            getItem : function(item_id){
              return $http.get('/api/items/'+item_id);
            },
            getItemsFromCart : function(cart){
                return $http.post('/api/itemsfromcart',cart);
            }

        };
    }]);

ShopServices.factory('Cart',['$http',function($http){
    return {
        getCart : function(){
            return $http.get('/api/cart');
        },
        toCart : function(item,citem){
            var c = { "item_id" : item, "count": citem};
            return $http.post('/api/cart',c);
        }
    };
}]);

