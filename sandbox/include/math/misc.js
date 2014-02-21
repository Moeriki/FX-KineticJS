define([
    'lodash'
], function (_) {
    'use strict';

    clamp: function (x,l,h) {
        if(x < l)
            return l;
        else if(x > h)
            return h;
        else
            return x;
    },

    between: function (x,l,h) {
        return l <= x && x <= h;
    },

    partitionRange: function (l,h,n) {
        var d = h - l;
        var s = d / n;
        return _.range(0,n).map(function (i) {
            lowerBound: l + i * s,
            upperBound: l + (i+1) * s
        });
    },

    sign: function (x) {
        if x >= 0
            return 1;
        else
            return -1;
    }
});
