describe('category list controller', function () {

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var $log;
    var $location;
    var categoryRepository;
    var shopHelperFunctions;

    beforeEach(function () {
        angular.mock.module('shopModule');

        angular.mock.inject(function (_$controller_, _categoryRepository_, _shopHelperFunctions_, _$log_, _$q_, _$rootScope_, _$location_) {
            $scope = {};
            $controller = _$controller_;
            categoryRepository = _categoryRepository_;
            shopHelperFunctions = _shopHelperFunctions_;
            $log = _$log_;
            $location = _$location_;
            $q = _$q_;
            $rootScope = _$rootScope_;            
        });

        $controller('CategoryListController', { $scope: $scope, categoryRepository: categoryRepository, $location: $location, $log: $log })
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


    it('should call error handler when delete fails', function () {

        spyOn(categoryRepository, 'deleteCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });

        spyOn(shopHelperFunctions, 'handleErrorResponse').and.callFake(function () {});

        $scope.deleteCategory();
        $rootScope.$apply();

        expect(shopHelperFunctions.handleErrorResponse).toHaveBeenCalled();
    });    
});