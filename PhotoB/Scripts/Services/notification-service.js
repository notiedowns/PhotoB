
(function(){

    var notificationService = function ($rootScope) {

        var service = {};    
        service.categoryId = '';
        service.photoId = '';


        service.notifyCategoryFilterSelected = function (categoryId) {
            this.categoryId = categoryId;
            $rootScope.$broadcast('categoryFilterSelectedBroadcast');
        };


        service.notifyPhotoAddedToCart = function (photoId) {
            this.photoId = photoId;
            $rootScope.$broadcast('photoAddedToCartBroadcast');
        };


        return service;
    }

    angular.module('shopModule').factory('notificationService', notificationService);

})();