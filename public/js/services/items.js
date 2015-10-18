var ContentServices = angular.module('ContentServices',[]);

ContentServices.factory('Items',['$http',function($http){
        return {
            getItems : function(){
                return $http.get('/api/items');
            },
            toCart : function(item){
                return $http.post('data/cart.json',item);
            }
        };
    }]);

ContentServices.factory('Cart',['$http',function($http){
    return {
        getCart : function(){
            return $http.get('data/cart');
        }
    };
}]);
