(function () {

    var menuRepository = function ($http) {

        var getCategoryMenu = function () {
            return $http.get('/Menu/GetCategoryMenu').then(function (response) {
                return response.data;
            });
        };

        var getAdminMenu = function () {
            return $http.get('/Menu/GetAdminMenu').then(function (response) {
                return response.data;
            });
        };

        return {
            getCategoryMenu: getCategoryMenu,
            getAdminMenu: getAdminMenu
        };
    };


    angular.module('shopModule').factory('menuRepository', menuRepository);

})();