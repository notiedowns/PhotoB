
(function () {

    var cartRepository = function ($http) {

        var getCart = function () {
            return $http.get('/Cart/GetCart').then(function (response) {
                return response.data;
            });
        };


        var addToCart = function (photoId) {
            return $http.post('/Cart/AddToCart', { photoId: photoId });
        };


        var removeFromCart = function (photoId) {
            return $http.post('/Cart/RemoveFromCart', { photoId: photoId });
        };


        return {
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            getCart: getCart
        };
    };

    angular.module('shopModule').factory('cartRepository', cartRepository);

})();