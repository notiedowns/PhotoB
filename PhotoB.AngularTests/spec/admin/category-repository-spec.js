describe('get categories', function(){

    var categoryRepository = {};
    var $httpBackend;

    beforeEach(function () {
        angular.mock.module('adminModule');

        angular.mock.inject(function (_categoryRepository_, _$httpBackend_) {
            categoryRepository = _categoryRepository_;
            $httpBackend = _$httpBackend_;
        });
    });


    it('should return a list of categories', function(){

        var expectedResults = { foo: 'bar' };
        $httpBackend.when('GET', '/Category/GetCategories').respond(200, expectedResults);

        var responseData;
        categoryRepository.getCategories().then(function (data) {
            responseData = data;
        });

        $httpBackend.flush();

        expect(responseData).toEqual(expectedResults);
    });


    it('should create new category', function () {
        $httpBackend.when('POST', '/Category/CreateCategory').respond(200);

        categoryRepository.createCategory();

        expect($httpBackend.flush).not.toThrow();
    });
});