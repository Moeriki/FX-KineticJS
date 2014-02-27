define(['lodash'], function (_) {
    'use strict';

    function sum (l) {
        return _(l).reduce(function (a,b) { return a + b; });
    }

    function average () {
        return sum(arguments) / arguments.length;
    }

    function gcd (a, b) {
        if (b == 0)
            return a;
        else
            return gcd(b, a % b);
    }

    return {
        sum: sum,
        average: average,
        gcd: gcd
    };
});
