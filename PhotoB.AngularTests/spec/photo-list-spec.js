describe('get photos', function () {

    beforeEach(function () {
        // module and inject don't need to be qualified with 'angular.mock' if you want. 
        angular.mock.module('shopModule');

        angular.mock.inject(function (_photoRepository_) {
            photoRepository = _photoRepository_;
        });
    });

    

    it('should retrieve a list of photos', function () {

        var photos = { foo: 'bar' };

        //angular.mock.module({
        //    'photoRepository': {
        //        getPhotos: function () {
        //            return photos;
        //        }
        //    }
        //});

        //angular.mock.module(function ($provide) {
        //    $provide.factory('photoRepository', function () {
        //        return {
        //            getPhotos: function () {
        //                return photos;
        //            }
        //        }
        //    });
        //});        

        // 'dump' formats output for console
        console.log(angular.mock.dump(photos));
        expect(photoRepository.getPhotos()).toEqual(photos);
    });
    
    it('should create new photo', function () {

        expect(photoRepository.createPhoto()).toEqual(true);
    });
});