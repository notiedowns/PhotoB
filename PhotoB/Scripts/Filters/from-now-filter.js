angular.module('shopModule')
    .filter('fromNow', function fromNowFilter() {
        return function (value, baseDate) {
            if (!value) { throw 'date value cannot be undefined'; }

            var date = value;

            if (typeof (value) === 'string') {
                date = new Date(date);
            }

            if (isNaN(date.getTime())) {
                return value;
            }

            var yearInMs = 60 * 60 * 24 * 365;
            var monthInMs = 60 * 60 * 24 * 30;
            var dayInMs = 60 * 60 * 24;
            var now = baseDate || new Date();
            var dateDiff = (now.getTime() - date.getTime()) / 1000;
            var tzDiff = (now.getTimezoneOffset() - date.getTimezoneOffset()) * 60;
            var diffInMs = dateDiff + tzDiff;

            var yearsDiff = diffInMs / yearInMs;
            var monthsDiff = diffInMs / monthInMs;
            var daysDiff = diffInMs / dayInMs;

            if (yearsDiff > 1) {
                yearsDiff = Math.floor(yearsDiff);
                return (yearsDiff === 1) ? ' (1 year ago)' : ' (' + yearsDiff + ' years ago)';
            } else if(monthsDiff > 1) {
                monthsDiff = Math.floor(monthsDiff);
                return (monthsDiff === 1) ? ' (1 month ago)' : ' (' + monthsDiff + ' months ago)';
            } else if (daysDiff > 1) {
                daysDiff = Math.floor(daysDiff);
                return (daysDiff === 1) ? ' (1 day ago)' : ' (' + daysDiff + ' days ago)';
            } else {
                return '';
            }

        };
    });