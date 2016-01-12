(function () {

    var adminMenuRepository = function ($http) {

        var getAdminMenu = function () {
            return $http.get('/Photo/GetAdminMenu').then(function (response) {
                return response.data;
            });
        };

        return {
            getAdminMenu: getAdminMenu
        }
    };


    angular.module('adminModule').factory('adminMenuRepository', adminMenuRepository);

})();