describe('category edit controller', function () {

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

        $controller('CategoryEditController', { $scope: $scope, categoryRepository: categoryRepository, categoryCacheService: categoryCacheService, $location: $location, $log: $log })
    });


    it('should set location and log after category created', function () {

        spyOn(categoryRepository, 'editCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        spyOn(categoryCacheService, 'storeSelectedCategory').and.callFake(function () {});

        spyOn($location, 'path');

        $scope.editCategory();
        $rootScope.$apply();

        expect($location.path).toHaveBeenCalledWith('/CategoryList');
        expect($log.info.logs[0]).toEqual(['New category created']);
        expect(categoryCacheService.storeSelectedCategory).toHaveBeenCalledWith({});
    });


    it('should should show custom exception message', function () {

        var response = {};
        response.data = {};
        response.data.exceptionMessage = "Custom error text";

        spyOn(categoryRepository, 'editCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject(response);
            return deferred.promise;
        });

        $scope.editCategory('category1');
        $rootScope.$apply();

        expect($log.info.logs[0]).toEqual(["Custom error text"]);
    });


    it('should thow default exception', function () {

        var response = {};
        response.data = {};

        spyOn(categoryRepository, 'editCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject(response);
            return deferred.promise;
        });

        $scope.editCategory('category1');

        expect(function () {
            $rootScope.$apply();
        }).toThrow('Server communication error');

        expect($log.info.logs[0]).toEqual(["Server communication error"]);
    });


    it('should return error list', function () {

        var response = {};
        response.data = {};
        response.data.validationErrors = [{ "Key": "columnName1", "Value": "errorDescription1" }, { "Key": "columnName2", "Value": "errorDescription2" }];

        spyOn(categoryRepository, 'editCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject(response);
            return deferred.promise;
        });

        $scope.editCategory('category1');
        $rootScope.$apply();

        expect($log.info.logs[0]).toEqual(["Validation errors found"]);
        expect($scope.validationErrors['columnName1']).toEqual('errorDescription1');
        expect($scope.validationErrors['columnName2']).toEqual('errorDescription2');
    });
    

    it('should set selected category as undefined from cache', function () {
        
        $controller('CategoryEditController', { $scope: $scope, categoryRepository: categoryRepository, categoryCacheService: categoryCacheService, $location: $location, $log: $log })

        expect($scope.selectedCategory).toEqual(undefined);
        expect($scope.editTitle).toEqual("Create Category");
    });


    it('should set selected category from cache', function () {

        var expectedResult = { "foo": "bar" };
        categoryCacheService.storeSelectedCategory(expectedResult);

        $controller('CategoryEditController', { $scope: $scope, categoryRepository: categoryRepository, categoryCacheService: categoryCacheService, $location: $location, $log: $log })
        
        expect($scope.selectedCategory).toEqual(expectedResult);
        expect($scope.editTitle).toEqual("Edit Category");
    });
});