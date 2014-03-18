(function () {
    'use strict';

    var Origin = {
        create: function () {
            var obj = Object.create(this);
            obj._init.apply(obj,arguments);
            return obj;
        },
        mixin: function () {
            for(var i = 0; i < arguments.length; i++) {
                var src = arguments[i];
                for(var prop in src) {
                    if(src.hasOwnProperty(prop)) {
                        Object.defineProperty(this, prop, Object.getOwnPropertyDescriptor(src, prop));
                    }
                }
            }
            return this;
        },
        extend: function() {
            var obj = Object.create(this);
            obj.mixin.apply(obj,arguments);
            return obj;
        },
        _init: function () {
        }
    };

    // Register AMD module or export to global namespace.
    if (typeof define === "function" && define.amd) {
        define("origin", [], function () {
            return Origin;
        });
    }
    else {
        this.Origin = Origin;
    }
}());
