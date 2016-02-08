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

        var getCategoryById = function (categoryId) {
            return $http.get('/Category/GetCategoryById', { params: { categoryId: categoryId } }).then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        return 'Error while getting category by id';
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
            getCategoryById: getCategoryById,
            editCategory: editCategory,
            deleteCategory: deleteCategory
        }
    }

    angular.module('shopModule').factory('categoryRepository', categoryRepository);

})();

