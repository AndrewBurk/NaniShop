angular.module('NaniShopItems', [])

.controller('ItemListCtrl', ['$scope','$http','Items','Chart', function ($scope,$http,Items,Chart) {
    Items.getItems()
        .success(function(data){
            $scope.items = data;

        });

    Chart.getChart().
        success(function(data){
            $scope.chart = data;
        });

    $scope.tochart = function(item){
        Items.toChart(item)
            .success(function(data){
                console.log(data);
                $scope.chart = data;
            });

    };

}]);