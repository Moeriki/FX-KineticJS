/*
 @author: Ruben Tytgat
*/

define([
    'lodash',
    'include/code'
], function (_,Code) {
    'use strict';

    // Mixin to add Observer subject logic
    return {
        mixinSubject: function (target) {
            Code.mixin(target, {
                initSubject: function (internalObj) {
                    this._observers = [];
                    this._observerInternalObj = internalObj || this;
                },
                registerObserver: function (o) {
                    this._observers.push(o);
                    return o;
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
            var args = Array.prototype.slice.call(arguments);

            Object.defineProperty(obj, name, {
                get: function () {
                    return this._observerInternalObj["_" + name];
                },
                set: function (n) {
                    this._observerInternalObj["_" + name] = n;
                    this.notifyObservers.apply(this,args);
                }
            });
        },

        defineWriteOnlyNotifyingProperty: function (obj,name) {
            var args = Array.prototype.slice.call(arguments);

            Object.defineProperty(obj, name, {
                set: function (n) {
                    this._observerInternalObj["_" + name] = n;
                    this.notifyObservers.apply(this,args);
                }
            });
        }
    };

});