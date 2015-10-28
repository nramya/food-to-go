/**
 * Created by rnarayanas on 8/30/15.
 */
angular.module('cafeApp', ['ui.bootstrap', 'ngAnimate', 'mgcrea.ngStrap']).controller('MainController', function ($scope, $q, cafeService, $modal) {
    var ref = new Firebase("https://food-to-go.firebaseio.com/");
    $scope.step = 1;
    $scope.restaurants = cafeService.restaurants;
    $scope.selectedRestaurant = '';
    $scope.itemsList = [];
    $scope.selectedItem = {};
    $scope.selectedItems = [];
    $scope.quantity = 1;
    $scope.balance = 0.0;

    $scope.fetchItems = function (step, restaurant) {
        $scope.step = step;
        $scope.selectedRestaurant = restaurant;
        $scope.itemsList = cafeService.restaurants[$scope.selectedRestaurant];
    };
    $scope.goBack = function (step) {
        $scope.step = step - 1;
        if ($scope.step == 1) {
            $scope.selectedItem = {};
        }
    };
    $scope.pickItem = function (item, price) {
        $scope.selectedItem['itemName'] = item;
        $scope.selectedItem['price'] = price;
    };
    $scope.addToCart = function (quantity) {
        $scope.quantity = quantity;
        $scope.selectedItems = [];
        //$scope.selectedItem['price'] = parseFloat(cafeService.restaurants[$scope.selectedRestaurant][$scope.selectedItem]);
        $scope.selectedItems.push({"itemName": $scope.selectedItem.itemName, "price": $scope.selectedItem.price, "quantity": $scope.quantity});
        $scope.updateBalance();
        //$scope.balance = $scope.balance + ($scope.quantity * $scope.selectedItem.price);
    };
    $scope.updateBalance = function () {
        $scope.balance = 0;
        angular.forEach($scope.selectedItems, function(item) {
            $scope.balance += item.quantity * item.price;
        });
    };
    $scope.goToPayment = function () {
        $scope.step = 3;
    };
    $scope.acceptToPay = function (checked) {
        console.log(checked);
        if(checked) {
            $scope.step = 4;
        }
    };
    $scope.confirmOrder = function (pickupTime) {
        $scope.pickupTime = pickupTime;
        $scope.step = 5;
    };
    $scope.removeItem = function (index) {
        $scope.selectedItems.splice(index, 1);
        $scope.updateBalance();
    };
    $scope.isItemSelected = function () {
        return Object.keys($scope.selectedItem).length > 0;
    };

    /************** Time-picker *************/

    $scope.minPickupTime = (new Date()).setMinutes((new Date()).getMinutes() + 10);


    /************** Countdown for pickup *************/

    $scope.countdown = function() {
        stopped = $timeout(function() {
            console.log($scope.counter);
            $scope.counter--;
            $scope.countdown();
        }, 1000);
    };


    /************** Modal for Login/ Registration *************/

    var modal = $modal({scope: $scope, template: 'partials/_login-registration.tpl.html', show: false});

    //$scope.users = ['1', '2'];
    //$scope.open = function () {
    //    var modalInstance = $modal.open({
    //        animation: true,
    //        templateUrl: 'partials/_login-registration.tpl.html',
    //        resolve: {
    //            users: function () {
    //                return $scope.users;
    //            }
    //        }
    //    });
    //
    //    modalInstance.result.then(function (selectedItem) {
    //        $scope.selected = selectedItem;
    //    }, function () {
    //        $log.info('Modal dismissed at: ' + new Date());
    //    });
    //};
    //
    //$scope.ok = function () {
    //    $modalInstance.close($scope.selected.item);
    //};
    //
    //$scope.cancel = function () {
    //    $modalInstance.dismiss('cancel');
    //};

}).factory('cafeService', function ($http, $q, $log) {
    return {
        restaurants : {
            'Starbucks' : {'Regular Coffee': 1.50, 'Latte': 2.25, 'Iced Tea': 1.25, 'Chocolate Chip Cookie': 2.0},
            'Taco Bell' : {'Burrito': 4.75, 'Taco': 3.50, 'Chalupa': 5.50, 'Quesadilla': 3.75},
            'Mc Donalds' : {'Fries': 2.50, 'Coke': 1.50, 'Burger': 3.50, 'Sandwich': 3.25},
            'Salad Place' : {'Caesars salad': 5.75, 'Garden Fresh': 4.75, 'Quinoa salad': 6.50, 'Fruit Bowl': 4.0}
        },
        users : {
            'admin' : ''
        }
    }
});