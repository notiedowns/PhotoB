describe('photo edit controller', function () {

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var $location;
    var $log;
    var photoRepository;

    beforeEach(function () {
        angular.mock.module('shopModule');

        angular.mock.inject(function (_$controller_, _photoRepository_, _$location_, _$log_, _$q_, _$rootScope_) {
            $scope = {};
            $controller = _$controller_;
            photoRepository = _photoRepository_;
            $location = _$location_;
            $log = _$log_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        });

        $controller('PhotoEditController', { $scope: $scope, photoRepository: photoRepository, $location: $location, $log: $log })
    });


    it('should save new photo', function () {

        spyOn(photoRepository, 'editPhoto').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        expect(function () {
            $scope.editPhoto('photo1');
            $rootScope.$apply();
        }).not.toThrow();
    });


    it('should return error list', function () {

        var response = {};
        response.data = {};
        response.data.validationErrors = [{ "Key": "columnName1", "Value": "errorDescription1" }, { "Key": "columnName2", "Value": "errorDescription2" }];

        spyOn(photoRepository, 'editPhoto').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject(response);
            return deferred.promise;
        });

        $scope.editPhoto('photo1');
        $rootScope.$apply();

        expect($scope.validationErrors['columnName1']).toEqual('errorDescription1');
        expect($scope.validationErrors['columnName2']).toEqual('errorDescription2');
        expect($log.info.logs[0]).toEqual(['Validation errors found']);
    });

});