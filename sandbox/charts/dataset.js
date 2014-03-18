define([
	'lodash',
	'origin',
    'include/patterns/observer'
], function (_, Origin, Observer) {

    var Dataset = Origin.extend({
        _init: function (data) {
            this.initSubject();
            this._data = data;
        },

        set: function (name, value) {
            this._data[name] = value;
            this.notifyObservers(name);
        },

        get: function (name) {
            return this._data[name];
        },

        get max () {
            return Math.max.apply(Math, _.values(this._data));
        }
    });

    Observer.mixinSubject(Dataset);
    Observer.defineNotifyingProperty(Dataset, 'data');

    return Dataset;
});
