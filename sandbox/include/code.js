define([
    'lodash'
], function (_) {
    'use strict';

    function mixin(tgt) {
        for(var i = 1; i < arguments.length; i++) {
            var src = arguments[i];
            for(var prop in src) {
                if(src.hasOwnProperty(prop)) {
                    Object.defineProperty(tgt, prop, Object.getOwnPropertyDescriptor(src, prop));
                }
            }
        }
        return tgt;
    }

    function extend(tgt) {
        var args = Array.prototype.slice.call(arguments);
        var obj = Object.create(tgt);
        args[0] = obj;
        mixin.apply(null, arguments);
        return obj;
    }

    function delegate(propName) {
        var args = _.toArray(arguments);
        args.shift();

        return function(target) {
            target[propName].apply(target,args);
        };
    }

    function instancer(proto) {
        return function () {
            var obj = Object.create(proto);
            obj._init.apply(obj, arguments);
            return obj;
        };
    }

    return {
        mixin: mixin,
        extend: extend,
        delegate: delegate,
        instancer: instancer
    };
});