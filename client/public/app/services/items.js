var ContentServices = angular.module('ContentServices',[]);

ContentServices.factory('Items',['$http',function($http){
        return {
            getAllItems : function(){
                return $http.get('/api/items');
            },
            getItem : function(item_id){
              return $http.get('/api/items/'+item_id);
            },
            getItemsFromCart : function(cart){
                return $http.post('/api/itemsfromcart',cart);
            }

        };
    }]);

ContentServices.factory('Cart',['$http',function($http){
    return {
        getCart : function(){
            return $http.get('/api/cart');
        },
        toCart : function(item){
            var c = { "item_id" : item,
                "count": 1};
            return $http.post('/api/cart',c);
        }
    };
}]);

