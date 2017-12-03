(function () {

    'use strict';

    var cartRepository = function ($http) {

        var getCart = function () {
            return $http.get('/Cart/GetCart').then(function (response) {
                return response.data;
            });
        };

        var getDeliveryAddress = function () {
            return $http.get('/Cart/GetDeliveryAddress').then(function (response) {
                return response.data;
            });
        };

        var getPaymentMethod = function () {
            return $http.get('/Cart/GetPaymentMethod').then(function (response) {
                return response.data;
            });
        };

        var addToCart = function (photoId) {
            return $http.post('/Cart/AddToCart', { photoId: photoId });
        };


        var removeFromCart = function (photoId) {
            return $http.post('/Cart/RemoveFromCart', { photoId: photoId });
        };

        var saveDeliveryAddress = function (customer) {
            return $http.post('/Cart/SaveDeliveryAddress', customer);
        };

        var savePaymentMethod = function (paymentMethod) {
            return $http.post('/Cart/SavePaymentMethod', { paymentMethod: paymentMethod });
        };

        return {
            getCart: getCart,
            getDeliveryAddress: getDeliveryAddress,
            getPaymentMethod: getPaymentMethod,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            saveDeliveryAddress: saveDeliveryAddress,
            savePaymentMethod: savePaymentMethod
        };
    };

    angular.module('shopModule').factory('cartRepository', cartRepository);

})();