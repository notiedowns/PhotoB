(function () {

    var menuRepository = function ($http) {

        var getMenu = function () {
            return $http.get('/Photo/GetMenu').then(function (response) {
                return response.data;
            });
        };

        return {
            getMenu: getMenu
        }
    };


    angular.module('productModule').factory('menuRepository', menuRepository);

})();