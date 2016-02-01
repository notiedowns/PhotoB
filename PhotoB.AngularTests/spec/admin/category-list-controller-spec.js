describe('category list controller', function () {

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var $log;
    var $location;
    var categoryRepository;
    var categoryCacheService;

    beforeEach(function () {
        angular.mock.module('shopModule');

        angular.mock.inject(function (_$controller_, _categoryRepository_, _categoryCacheService_, _$log_, _$q_, _$rootScope_, _$location_) {
            $scope = {};
            $controller = _$controller_;
            categoryRepository = _categoryRepository_;
            categoryCacheService = _categoryCacheService_;
            $log = _$log_;
            $location = _$location_;
            $q = _$q_;
            $rootScope = _$rootScope_;            
        });

        $controller('CategoryListController', { $scope: $scope, categoryRepository: categoryRepository, categoryCacheService: categoryCacheService, $location: $location, $log: $log })
    });


    it('should populate categories array on $scope', function () {

        var expectedResults = [{ "number": "1", "name": "Category 1" }];

        spyOn(categoryRepository, 'getCategories').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(expectedResults);
            return deferred.promise;
        });

        $scope.getCategories();        
        $rootScope.$apply();

        expect($scope.categories).toBe(expectedResults);
    });


    it('should initialise edit category', function () {

        spyOn($location, 'path').and.callFake(function () { });
        spyOn(categoryCacheService, 'storeSelectedCategory').and.callFake(function () { });

        $scope.loadEditCategory();

        expect(categoryCacheService.storeSelectedCategory).toHaveBeenCalledWith(null);
        expect($location.path).toHaveBeenCalledWith('/CreateCategory');
    });


    it('should cache selected category for edit', function () {

        $scope.categories = [{ "id": "1", "name": "Category 1" }];
        $controller('CategoryListController', { $scope: $scope, categoryRepository: categoryRepository, categoryCacheService: categoryCacheService, $location: $location, $log: $log })

        spyOn($location, 'path').and.callFake(function () { });
        spyOn(categoryCacheService, 'storeSelectedCategory').and.callFake(function () { });

        $scope.editCategory("1");

        expect(categoryCacheService.storeSelectedCategory).toHaveBeenCalledWith($scope.categories[0]);
        expect($location.path).toHaveBeenCalledWith('/CreateCategory');
    });


    it('should delete selected category', function () {

        spyOn(categoryRepository, 'deleteCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        spyOn(categoryRepository, 'getCategories').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        $scope.deleteCategory("1");
        $rootScope.$apply();

        expect($log.info.logs[0]).toEqual(["Category deleted"]);
        expect(categoryRepository.getCategories).toHaveBeenCalled();
    });


    it('should log error when delete fails', function () {

        spyOn(categoryRepository, 'deleteCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });

        $scope.deleteCategory("1");
        $rootScope.$apply();

        expect($log.info.logs[0]).toEqual(["Error deleting category"]);
    });
    
});