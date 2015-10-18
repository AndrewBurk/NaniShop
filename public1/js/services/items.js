angular.module('ItemsService',[])
.factory('Items',['$http',function($http){
        return {
            getItems : function(){
                return $http.get('data/items.json');
            },
            toCart : function(item){
                return $http.post('data/cart.json',item);
            }
        };
    }]);
