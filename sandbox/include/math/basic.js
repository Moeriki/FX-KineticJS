define('lodash', function (_) {
    'use strict';

    function sum (l) {
        return _(l).reduce(function (a,b) { return a + b; });
    }

    function average () {
        return sum(arguments) / arguments.length;
    }

    return {
        sum: sum,
        average: average
    };
});
