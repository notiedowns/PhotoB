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

        var editCategory = function (category) {
            return $http.post('/Category/EditCategory', category);
        };

        var deleteCategory = function (categoryId) {
            return $http.post('/Category/DeleteCategory', { categoryId: categoryId });
        };

        return {
            getCategories: getCategories,
            editCategory: editCategory,
            deleteCategory: deleteCategory
        }
    }

    angular.module('shopModule').factory('categoryRepository', categoryRepository);

})();

