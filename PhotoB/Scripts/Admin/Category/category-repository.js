(function () {
    
    var categoryRepository = function ($http) {
    
        var getCategories = function () {
            return $http.get('/Category/GetCategories').then(
                    function (response) {
                        return response.data;
                    },
                    function () {
                        return 'Error while getting category data';
                    });
        };

        return {
            getCategories: getCategories
        }
    }

    angular.module('adminModule').factory('categoryRepository', categoryRepository);

})();

