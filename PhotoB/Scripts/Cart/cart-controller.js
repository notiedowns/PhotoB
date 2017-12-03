(function () {

    'use strict';

    var cartController = function ($scope, cartRepository, notificationService, shopHelperFunctions, $log, $location) {

        // Get cart contents from session
        $scope.getCart = function () {
            cartRepository.getCart().then(function (data) {
                $scope.cart = data.cart;
                $scope.cartSummary = data.cartSummary;
            });
        };

        // Get customer address from session
        $scope.getDeliveryAddress = function () {
            cartRepository.getDeliveryAddress().then(function (data) {
                $scope.customer = data;
            });
        };

        // Get customer payment method from session
        $scope.getPaymentMethod = function () {
            cartRepository.getPaymentMethod().then(function (data) {
                $scope.paymentMethod = data;
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
        };

        function onAddToCartError(response) {
            shopHelperFunctions.handleErrorResponse(response);
        };

        // Remove photo from cart
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
        };

        function onRemoveFromCartSuccess(response) {
            $log.info('Photo removed to cart');
            $scope.getCart();
        };

        function onRemoveFromCartError(response) {
            shopHelperFunctions.handleErrorResponse(response);
        };

        $scope.continueDeliverAddress = function () {
            $location.path("/CartCustomerAddress");
        };

        $scope.continuePaymentMethod = function () {
            cartRepository.saveDeliveryAddress($scope.customer).then(
                onContinuePaymentMethodSuccess,
                onError
            );
        };

        function onContinuePaymentMethodSuccess(response) {
            $log.info('Delivery address saved');
            $location.path("/CartCustomerPaymentMethod");
        };

        $scope.submitOrder = function () {
            cartRepository.savePaymentMethod($scope.paymentMethod).then(
                onSubmitOrderSuccess,
                onError
            );
        };

        function onSubmitOrderSuccess(response) {
            $log.info('Order submitted');
            $scope.validationErrors = {};

            var val = $scope.paymentMethod;
            if (val) {
                bootbox.alert("Thank you for your order! Payment Method is: " + val);
            }
        };

        $scope.backToCart = function () {
            $location.path("/Cart");
        };

        function onError(response) {
            shopHelperFunctions.handleErrorResponse(response, createErrorMessage);
        };

        function createErrorMessage(validationErrors) {
            if (validationErrors && validationErrors.length > 0) {
                // Clear all previous validation errors
                $scope.validationErrors = {};

                for (var i = 0; i < validationErrors.length; i++) {

                    var propertyName = validationErrors[i].Key;

                    // Create property on scope if it doesn't already exist
                    if (!$scope.validationErrors[propertyName]) {
                        $scope.validationErrors[propertyName] = '';
                    }

                    // Add a comma if property already contains text
                    if ($scope.validationErrors[propertyName].length > 0) {
                        $scope.validationErrors[propertyName] += ', ';
                    }

                    $scope.validationErrors[propertyName] += validationErrors[i].Value;
                }
            }
        }
    };

    angular.module('shopModule').controller("CartController", ["$scope", "cartRepository", "notificationService", "shopHelperFunctions", "$log", "$location", cartController]);

})();