'use strict';

(function () {

    describe('During construction of the controller', function () {

        var scope, controller, photoRepositoryMock, photos;

        beforeEach(function () {
            module('shopModule');

            inject(function ($rootScope, $controller, photoRepository) {
                scope = $rootScope.$new();
                photoRepositoryMock = sinon.stub(photoRepository);
                photos = [{ foo: 'bar' }];
                photoRepositoryMock.getPhotos.returns(photos);
                controller = $controller('PhotolistController', { $scope: scope });
            });   
        });

        it('Should set the photos from the repository', function () {
            expect(scope.photos).toBe(photos);
        });

    });

})();