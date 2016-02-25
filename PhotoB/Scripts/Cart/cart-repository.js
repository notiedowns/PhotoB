
(function () {

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


        var addToCart = function (photoId) {
            return $http.post('/Cart/AddToCart', { photoId: photoId });
        };


        var removeFromCart = function (photoId) {
            return $http.post('/Cart/RemoveFromCart', { photoId: photoId });
        };


        var saveDeliveryAddress = function (customer) {
            return $http.post('/Cart/SaveDeliveryAddress', customer);
        };


        return {
            getCart: getCart,
            getDeliveryAddress: getDeliveryAddress,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            saveDeliveryAddress: saveDeliveryAddress
        };
    };

    angular.module('shopModule').factory('cartRepository', cartRepository);

})();