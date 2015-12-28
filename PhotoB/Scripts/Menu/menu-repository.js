(function () {

    angular.module('shopModule').factory('menuRepository', function ($http) {
        return {
            get: function () {
                return $http.get('/Photo/GetMenu');
            }
        }
    });

})();