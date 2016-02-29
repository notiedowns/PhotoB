describe('from now date filter', function () {

    var fromNow;

    beforeEach(function () {
        angular.mock.module('shopModule');

        angular.mock.inject(function (_$filter_) {
            fromNow = _$filter_('fromNow');
        });
    });


    it('should throw error if undefined', function () {
        expect(fromNow).toThrow('date value cannot be undefined');
    });


    it('should return same value for invalid date', function () {
        expect(fromNow('foo')).toBe('foo');
    });


    it('should return value of years ago for given data object', function () {
        var value = new angular.mock.TzDate(0, '2013-07-01T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe(' (2 years ago)');
    });


    it('should return value of one year ago (singular)', function () {
        var value = new angular.mock.TzDate(0, '2014-07-01T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe(' (1 year ago)');
    });


    it('should return value of months ago for given data object', function () {
        var value = new angular.mock.TzDate(0, '2015-01-01T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe(' (7 months ago)');
    });


    it('should return value of one month ago (singular)', function () {
        var value = new angular.mock.TzDate(0, '2015-07-01T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe(' (1 month ago)');
    });

    it('should return value of days ago for given data object', function () {
        var value = new angular.mock.TzDate(0, '2015-07-30T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T00:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe(' (2 days ago)');
    });

    it('should return value of one day ago for given data object', function () {
        var value = new angular.mock.TzDate(0, '2015-07-31T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe(' (1 day ago)');
    });
});