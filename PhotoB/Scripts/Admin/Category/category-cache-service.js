(function () {

    var cachService = function () {

        this.cachedCategory = {};

        var storeSelectedCategory = function (category) {
            this.cachedCategory = category;
        };

        var loadSelectedCategory = function () {
            return this.cachedCategory;
        };

        return {
            storeSelectedCategory: storeSelectedCategory,
            loadSelectedCategory: loadSelectedCategory
        }
    };


    angular.module('adminModule').factory('categoryCacheService', cachService);

})();