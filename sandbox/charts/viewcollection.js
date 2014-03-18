define([
    'origin',
    'include/arrays'
], function (Origin, Arrays) {

	return Origin.extend({
        _init: function (dataset, viewAddFunc, viewDisposeFunc) {
            this.node = new Kinetic.Group();
            this._dataset = dataset;
            this._observerToken = this._dataset.registerObserver(_.bind(this._resetView, this));
            this._observationViews = [];
            this._viewAddFunc = viewAddFunc;
            this._viewDisposeFunc = viewDisposeFunc;
        },

        placed: function () {
            this._resetView();
        },

        dispose: function () {
            this._dataset.unregisterObserver(this._observerToken);
        },

        _resetView: function () {
            var i = 0, max = this._dataset.max;

            Arrays.resize(this._observationViews, _.keys(this._dataset.data).length, _.bind(function (i) {
                var view = this._viewAddFunc(i);
                this.node.add(view.node);
                return view;
            }, this), _.bind(function (view) {
                view.node.detach();
                this._viewDisposeFunc(view);
            }, this));

            _(this._dataset.data).forOwn(_.bind(function (value, label) {
                this._observationViews[i++].reset(value, label, max);
            }, this));
        }
    });

});
