describe('get photos', function () {
    var photoRepository = {};
    var $httpBackend;

    beforeEach(function () {
        // module and inject don't need to be qualified with 'angular.mock' if you want. 
        angular.mock.module('shopModule');

        angular.mock.inject(function (_photoRepository_, _$httpBackend_) {
            photoRepository = _photoRepository_;
            $httpBackend = _$httpBackend_;
        });
    });

    

    it('should retrieve a list of photos', function () {
        var testPhotoData = { foo: 'bar' }; 
        console.log(angular.mock.dump(testPhotoData));

        $httpBackend.when('GET', '/Photo/GetPhotos').respond(200, testPhotoData);

        var responseData;
        photoRepository.getPhotos().then(function (data) {
            responseData = data;
        });

        $httpBackend.flush();

        expect(responseData).toEqual(testPhotoData);
    });
    
    it('should create new photo', function () {
        expect(photoRepository.createPhoto()).toEqual(true);
    });
});