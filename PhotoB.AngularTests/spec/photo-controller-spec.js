﻿describe('photo controller', function () {

    var expectedResults = [{ "number": "1", "name": "Product 1", "price": 12.9, "dateListed": "2016-01-05T11:01:46.5203217+01:00", "author": "Wayne" }];
    
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

        angular.mock.inject(function (_$controller_, _photoRepository_, _$interval_, _$timeout_, _$log_, _$q_, _$rootScope_) {
            $scope = {};
            $controller = _$controller_;
            photoRepository = _photoRepository_;
            $interval = _$interval_;
            $timeout = _$timeout_;
            $log = _$log_;
            $q = _$q_;
            $rootScope = _$rootScope_;            
        });        
    });


    it('should populate photos array on $scope', function () {

        // Create a mock call to getPhotos
        spyOn(photoRepository, 'getPhotos').and.callFake(function () {

            // Need to manually resolve the promise returned from the photoRepository call.
            // Use $q service to create an instance of a deferred object, and resolve the promise with our test data.
            // Return a promise, which provides the .then syntax in our controller code.
            var deferred = $q.defer();
            deferred.resolve(expectedResults);
            return deferred.promise;
        });

        $controller('PhotolistController', { $scope: $scope, photoRepository: photoRepository, $interval: $interval, $log: $log, $timeout: $timeout })
        $scope.getPhotos();
        
        // When we returned a promise from the fake call we added a new promise to an internal list of promises ready to be processed by angulars event cycle.
        // When run in the browser this is handled for us, but not always in tests.
        // Need to call $apply on $rootScope to trigger angulars event cycle and resolve the promise.
        $rootScope.$apply();

        expect($scope.photos).toBe(expectedResults);
    });


    it('should execute search after 1 second of keyboard inactivity', function () {

        var expectedSearchResults = [{ "number": "1", "name": "Product 3", "price": 12.9, "dateListed": "2016-01-05T11:01:46.5203217+01:00", "author": "Wayne" }];

        spyOn(photoRepository, 'getPhotos').and.callFake(function () {

            // Need to manually resolve the promise returned from the photoRepository call.
            // Use $q service to create an instance of a deferred object, and resolve the promise with our test data.
            // Return a promise, which provides the .then syntax in our controller code.
            var deferred = $q.defer();
            deferred.resolve(expectedSearchResults);
            return deferred.promise;
        });

        $controller('PhotolistController', { $scope: $scope, photoRepository: photoRepository, $interval: $interval, $log: $log, $timeout: $timeout })
        
        $scope.query = 'Product3';
        $scope.keyup();
        $timeout.flush();

        expect($scope.photos[0].name).toBe('Product 3');
    });


    it('should cancel timeout on keydowm', function () {

        var expectedSearchResults = [{ "number": "1", "name": "Product 3", "price": 12.9, "dateListed": "2016-01-05T11:01:46.5203217+01:00", "author": "Wayne" }];

        $controller('PhotolistController', { $scope: $scope, photoRepository: photoRepository, $interval: $interval, $log: $log, $timeout: $timeout })

        $scope.query = 'Product3';
        $scope.keyup();
        $scope.keydown();

        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
});