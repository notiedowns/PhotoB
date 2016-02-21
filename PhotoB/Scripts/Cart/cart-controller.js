(function () {

    'use strict'

    var cartController = function ($scope, cartRepository, notificationService, shopHelperFunctions, $log) {

        $scope.getCart = function () {
            cartRepository.getCart().then(function (data) {
                $scope.cart = data;
            });
        };

        //TEST
        $scope.$on('categoryFilterSelectedBroadcast', function () {
            $scope.selectedCategoryId = notificationService.categoryId;
            $scope.search();
        });

        // Handle add to cart event
        $scope.$on('photoAddedToCartBroadcast', function () {
            cartRepository.addToCart(notificationService.photoId).then(
                onAddToCartSuccess,
                onAddToCartError
                );
        });
        
        function onAddToCartSuccess(response) {
            $log.info('Photo added to cart');
            $scope.getCart();
        }

        function onAddToCartError(response) {
            shopHelperFunctions.handleErrorResponse(response);
        }
    };


    angular.module('shopModule').controller("CartController", ["$scope", "cartRepository", "notificationService", "shopHelperFunctions", "$log", cartController]);

})();