/**
 * Created by rnarayanas on 8/30/15.
 */
angular.module('cafeApp', ['ui.bootstrap']).controller('MainController', function ($scope, $q, cafeService, $log) {
    var ref = new Firebase("https://food-to-go.firebaseio.com/");
    $scope.step = 1;
    $scope.restaurants = cafeService.restaurants;
    $scope.selectedRestaurant = '';
    $scope.itemsList = [];
    $scope.selectedItem = '';
    $scope.quantity = 1;
    $scope.balance = 0.0;

    $scope.fetchItems = function (step, restaurant) {
        $scope.step = step;
        $scope.selectedRestaurant = restaurant;
        $scope.itemsList = cafeService.restaurants[$scope.selectedRestaurant];
    };
    $scope.goBack = function (step) {
        $scope.step = step - 1;
    };
    $scope.pickItem = function (item) {
        $scope.selectedItem = item;
    };
    $scope.addToCart = function (quantity) {
        $scope.quantity = quantity;
        var price = parseFloat(cafeService.restaurants[$scope.selectedRestaurant][$scope.selectedItem]);
        $scope.balance = $scope.balance + ($scope.quantity * price);
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
    $scope.confirmOrder = function () {
        $scope.step = 5;
    };

    /************** Time-picker *************/

    $scope.currentTime = new Date();
    $scope.pickupTime = $scope.currentTime;
    $scope.hstep = 1;
    $scope.mstep = 5;
    $scope.ismeridian = true;

    $scope.changed = function () {
        console.log($scope.pickupTime, $scope.currentTime);
        $log.log('Time changed to: ' + $scope.pickupTime);
    };

    /************** Countdown for pickup *************/
    $scope.countdown = function() {
        stopped = $timeout(function() {
            console.log($scope.counter);
            $scope.counter--;
            $scope.countdown();
        }, 1000);
    };

}).factory('cafeService', function ($http, $q, $log) {
    return {
        restaurants : {
            'Starbucks' : {'Regular Coffee': 1.50, 'Latte': 2.25, 'Iced Tea': 1.25, 'Chocolate Chip Cookie': 2.0},
            'Taco Bell' : {'Burrito': 4.75, 'Taco': 3.50, 'Chalupa': 5.50, 'Quesadilla': 3.75},
            'Mc Donalds' : {'Fries': 2.50, 'Coke': 1.50, 'Burger': 3.50, 'Sandwich': 3.25},
            'Salad Place' : {'Caesars salad': 5.75, 'Garden Fresh': 4.75, 'Quinoa salad': 6.50, 'Fruit Bowl': 4.0}
        }
    }
});