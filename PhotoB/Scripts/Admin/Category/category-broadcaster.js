
(function(){

    var categoryBroadcaster = function ($rootScope) {

        var service = {};    
        service.categoryId = '';

        service.broadcastCategoryFilter = function (id) {
            this.categoryId = id;
            $rootScope.$broadcast('categoryFilterBroadcast');
        };

        return service;
    }

    angular.module('shopModule').factory('categoryBroadcaster', categoryBroadcaster);

})();