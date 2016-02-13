describe('category edit controller', function () {

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

        $controller('CategoryEditController', { $scope: $scope, categoryRepository: categoryRepository, shopHelperFunctions: shopHelperFunctions, $location: $location, $log: $log })
    });


    it('should set location and log after category created', function () {

        spyOn(categoryRepository, 'editCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });
        
        spyOn($location, 'path');

        $scope.editCategory();
        $rootScope.$apply();

        expect($location.path).toHaveBeenCalledWith('/CategoryList');
        expect($log.info.logs[0]).toEqual(['New category created']);
    });


    it('rejected response should create call to handleErrorResponse', function () {

        var response = {};
        response.data = {};
        response.data.exceptionMessage = "Custom error text";

        spyOn(categoryRepository, 'editCategory').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject(response);
            return deferred.promise;
        });

        spyOn(shopHelperFunctions, 'handleErrorResponse').and.callFake(function () {});

        $scope.editCategory('category1');
        $rootScope.$apply();

        expect(shopHelperFunctions.handleErrorResponse).toHaveBeenCalled();
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

});