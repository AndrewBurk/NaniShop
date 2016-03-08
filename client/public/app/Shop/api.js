/**
 * Created by andrew on 08.03.16.
 */
var Api = angular.module('Api',[]);

Api.factory('Items',['$http',function($http){
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