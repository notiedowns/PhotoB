describe('photo controller', function () {

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var $interval;
    var $timeout;
    var $location;
    var $log;
    var photoRepository;

    beforeEach(function () {
        angular.mock.module('adminModule');

        angular.mock.inject(function (_$controller_, _photoRepository_, _$location_, _$log_, _$q_, _$rootScope_) {
            $scope = {};
            $controller = _$controller_;
            photoRepository = _photoRepository_;
            $location = _$location_;
            $log = _$log_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        });

        $controller('PhotoCreateController', { $scope: $scope, photoRepository: photoRepository, $location: $location, $log: $log })
    });


    it('should save new photo', function () {

        spyOn(photoRepository, 'createPhoto').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        expect(function () {
            $scope.createPhoto('photo1');
            $rootScope.$apply();
        }).not.toThrow();

        expect($log.info.logs[0]).toEqual(['New photo created']);
    });


    it('should thow exception', function () {

        spyOn(photoRepository, 'createPhoto').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });

        $scope.createPhoto('photo1');

        expect(function () {
            $rootScope.$apply();
        }).toThrow('Something went wrong');

        expect($log.info.logs[0]).toEqual(['Validation errors found']);
    });


    it('should return error list', function () {

        var errors = {};
        errors.data = [{ "key": "columnName1", "value": "errorDescription1" }, { "key": "columnName2", "value": "errorDescription2" }];

        spyOn(photoRepository, 'createPhoto').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject(errors);
            return deferred.promise;
        });

        $scope.createPhoto('photo1');
        $rootScope.$apply();

        expect($scope.validationErrors['columnName1']).toEqual('errorDescription1');
        expect($scope.validationErrors['columnName2']).toEqual('errorDescription2');
    });

});