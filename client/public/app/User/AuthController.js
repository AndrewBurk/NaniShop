/**
 * Created by andrew on 30.10.15.
 */

var AuthCtrl = angular.module('AuthCtrl', []);

AuthCtrl.controller('loginController', ['$scope', '$location', 'UserServices', function ($scope, $location, UserServices) {
    $scope.login = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        UserServices.login($scope.loginForm.username, $scope.loginForm.password)
            // handle success
            .then(function () {
                $location.path('/');
                $scope.disabled = false;
                $scope.User.username = $scope.loginForm.username;
                $scope.User.userrole = UserServices.getUserRole();
                $scope.loginForm = {};
            })
            // handle error
            .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                $scope.disabled = false;
                $scope.loginForm = {};
            });
    };

}]);

AuthCtrl.controller('logoutController', ['$scope', '$location', 'UserServices', function ($scope, $location, UserServices) {

        $scope.logout = function () {

            console.log(UserServices.getUserStatus());

            // call logout from service
            UserServices.logout()
                .then(function () {
                    $scope.User.username ='';
                    $scope.User.totalCount = 0;
                    $scope.User.userrole = '';
                    $scope.User.cart.length = 0;
                    $location.path('/');
                });

        };

    }]);

AuthCtrl.controller('registerController', ['$scope', '$location', 'UserServices', function ($scope, $location, UserServices) {

        console.log(UserServices.getUserStatus());

        $scope.register = function () {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call register from service
            UserServices.register($scope.registerForm.username, $scope.registerForm.email, $scope.registerForm.password)
                // handle success
                .then(function () {
                    $location.path('/login');
                    $scope.User.username=$scope.registerForm.username;
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.User.username ='';
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };

    }]);