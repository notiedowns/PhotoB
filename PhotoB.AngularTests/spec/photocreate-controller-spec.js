describe('photo controller', function () {

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var $interval;
    var $timeout;
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
    });

});