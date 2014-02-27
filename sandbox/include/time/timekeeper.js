/**
 * @author: Ruben Tytgat
 */

define(['lodash','include/patterns/observer', 'include/code'], function (_, Observer, Code) {
    'use strict';

    var ProtoTimeKeeper = {
        _init: function() {
            this._isSynced = false;
            this._time = new Date();
            this._interval = null;
            this.initSubject();
            this.sync();
        },
        isSynced: function() {
            return this._isSynced;
        },
        sync: function() {
            if(this._isSynced) {
                return;
            }

            this._interval = window.setInterval(this.notifyObservers.bind(this,true),1000);

            this._isSynced = true;
        },
        unsync: function() {
            if(!this._isSynced) {
                return;
            }

            window.clearInterval(this._interval);

            this._isSynced = false;
        },
        dispose: function() {
            this.unsync();
        }
    };
    
    Object.defineProperty(ProtoTimeKeeper, 'time', {
        get: function() {
            if(this._isSynced) {
                this._time = new Date();
            }
            return this._time;
        },
        set: function(t) {
            this._time = t;
            this.notifyObservers(false);
        }
    });

    Observer.mixinSubject(ProtoTimeKeeper);


    var ProtoRemainingTimeKeeper = Object.create(ProtoTimeKeeper);
    Code.mixin(ProtoRemainingTimeKeeper, {
        _init: function () {
            this._targetTime = new Date()
            ProtoTimeKeeper._init.apply(this);
        },
        sync: function () {
            // When resyncing, set the remaining seconds back
            var rem = this.remainingSeconds
            ProtoTimeKeeper.sync.apply(this);
            this.remainingSeconds = rem
        }
    });

    Object.defineProperty(ProtoRemainingTimeKeeper, 'remainingSeconds', {
        get: function () {
            var r = this._targetTime.getTime() - this.time.getTime();
            return r < 0 ? 0 : Math.round(r / 1000);
        },
        set: function (s) {
            this._targetTime = new Date(this.time.getTime() + s * 1000);
            this.notifyObservers(false);
        }
    });


    return {
        TimeKeeper: {
            create: function () {
                var t = Object.create(ProtoTimeKeeper);
                t._init();
                return t;
            }
        },
        RemainingTimeKeeper: {
            create: function () {
                var t = Object.create(ProtoRemainingTimeKeeper);
                t._init();
                return t;
            }
        }
    }
});
