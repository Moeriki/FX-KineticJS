define([
    'lodash'
], function (_) {
    'use strict';

    return {
        delegate: function (propName) {
            var args = _.toArray(arguments);
            args.shift();

            return function(target) {
                target[propName].apply(target,args);
            };
        }
    };
});