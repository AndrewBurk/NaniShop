/**
 * Created by andrew on 08.03.16.
 */
function storeController($scope, $stateParams, DataService){
    console.log('dataservice');
    $scope.cart = DataService.cart;
    $scope.store = DataService.store;

    if ($stateParams.item_id != null) {
        $scope.product = $scope.store.getProduct($stateParams.item_id);
        console.log('getItemId');
    }

}