/*
 @author: Ruben Tytgat
*/

define([
    'lodash'
], function (_) {
    'use strict';

    // Mixin to add Observer subject logic
    return {
        mixinSubject: function (target) {
            _.mixin(target, {
                initSubject: function () {
                    this._observers = [];
                },
                registerObserver: function (o) {
                    this._observers.push(o);
                },

                unregisterObserver: function (o) {
                    i = this._observers.indexOf(o);
                    if(i != -1)
                        this._observers.splice(i,1);
                },

                notifyObservers: function () {
                    var args = Array.prototype.slice.apply(arguments);

                    _(this._observers).forEach(function (observer) {
                        observer.apply(null, args);
                    });
                }
            });
        },

        defineNotifyingProperty: function (obj,name) {
            var args = Array.prototype.slice.apply(arguments,2);

            Object.defineProperty(obj, name, {
                get: function () {
                    this["_#{name}"];
                },
                set: function (n) {
                    this["_#{name}"] = n;
                    this.notifyObservers.apply(this,args);
                }
            });
        },

        defineWriteOnlyNotifyingProperty: function (obj,name) {
            var args = Array.prototype.slice.apply(arguments,2);

            Object.defineProperty(obj, name, {
                set: function (n) {
                    this["_#{name}"] = n;
                    this.notifyObservers.apply(args);
                }
            });
        }
    };

});