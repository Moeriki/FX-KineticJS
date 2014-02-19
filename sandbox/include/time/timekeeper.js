/**
 * @author: Ruben Tytgat
 */

define(['widgets/include/patterns/observer','class'], function(Observer,Class) {
    'use strict';

    var TimeKeeper = Class.extend({
        init: function() {
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
    });
    
    Object.defineProperty(TimeKeeper.prototype, 'time', {
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

    Observer.mixinSubject(TimeKeeper.prototype);

    return TimeKeeper;
});
