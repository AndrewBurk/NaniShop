/**
 * Created by andrew on 08.03.16.
 */
function storeController($scope, $stateParams, DataService){
    $scope.cart = DataService.cart;
    $scope.store = DataService.store;

    if ($stateParams.item_id != null) {
        var product = $scope.store.getProduct($stateParams.item_id);
        localStorage['products'] = product != null ? JSON.stringify(product) : localStorage['products'];
        $scope.product = JSON.parse(localStorage['products']);
    }

}