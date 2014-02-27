define([
    'lodash'
], function (_) {
    'use strict';

    return {
        mixin: function (tgt, src) {
            for(var prop in src) {
                if(src.hasOwnProperty(prop)) {
                    Object.defineProperty(tgt, prop, Object.getOwnPropertyDescriptor(src, prop));
                }
            }
            return tgt;
        },
        delegate: function (propName) {
            var args = _.toArray(arguments);
            args.shift();

            return function(target) {
                target[propName].apply(target,args);
            };
        },
        instancer: function (proto) {
            return function () {
                var obj = Object.create(proto);
                obj._init.apply(obj, arguments);
                return obj;
            };
        }
    };
});