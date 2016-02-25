(function () {

    'use strict';

    var cartController = function ($scope, cartRepository, notificationService, shopHelperFunctions, $log) {

        $scope.getCart = function () {
            cartRepository.getCart().then(function (data) {
                $scope.cart = data.cart;
                $scope.cartSummary = data.cartSummary;
            });
        };

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


        // Delete selected photo
        $scope.confirmRemoveFromCart = function (photoId) {
            bootbox.dialog({
                message: "Are you sure you want to remove this photo from you shopping cart?",
                buttons: {
                    yes: {
                        label: "Yes",
                        className: "btn-primary btn-sm",
                        callback: function () {
                            removeFromCart(photoId);
                        }
                    },
                    cancel: {
                        label: "Cancel",
                        className: "btn-default btn-sm"
                    }
                }
            });
        };
        function removeFromCart(photoId) {
            cartRepository.removeFromCart(photoId).then(
                onRemoveFromCartSuccess,
                onRemoveFromCartError
                );
        }
        function onRemoveFromCartSuccess(response) {
            $log.info('Photo removed to cart');
            $scope.getCart();
        }
        function onRemoveFromCartError(response) {
            shopHelperFunctions.handleErrorResponse(response);
        }


        $scope.purchase = function() {
            bootbox.alert("Thank you for your order!");
        }
    };


    angular.module('shopModule').controller("CartController", ["$scope", "cartRepository", "notificationService", "shopHelperFunctions", "$log", cartController]);

})();