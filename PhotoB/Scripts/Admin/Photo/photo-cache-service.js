(function () {

    var cachService = function () {

        this.cachedPhoto = {};

        var storeSelectedPhoto = function (photo) {
            this.cachedPhoto = photo;
        };

        var loadSelectedPhoto = function () {
            return this.cachedPhoto;
        };

        return {
            storeSelectedPhoto: storeSelectedPhoto,
            loadSelectedPhoto: loadSelectedPhoto
        }
    };


    angular.module('shopModule').factory('photoCacheService', cachService);

})();