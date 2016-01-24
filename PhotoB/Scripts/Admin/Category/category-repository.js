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

        var createCategory = function (category) {
            return $http.post('/Category/CreateCategory', category);
        };

        return {
            getCategories: getCategories,
            createCategory: createCategory
        }
    }

    angular.module('adminModule').factory('categoryRepository', categoryRepository);

})();

