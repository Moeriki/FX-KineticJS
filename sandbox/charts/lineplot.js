define([
	'origin',
    './scatterplot'
], function (Origin,ScatterPlot) {
    var VerticalLinePlot = ScatterPlot.VerticalScatterPlot.extend({
        _init: function (dataset, colors, attrs) {
            ScatterPlot.VerticalScatterPlot._init.call(this, dataset, colors, attrs);
            
            this._line = new Kinetic.Line({
                stroke: 'black',
                strokeWidth: 5,
                points: []
            });
            this.node.add(this._line);
            this._line.setZIndex(1);

            this._observerToken = dataset.registerObserver(_.bind(this._resetView, this));
            this._dataset = dataset;
        },

        placed: function () {
            this._resetView();
            ScatterPlot.VerticalScatterPlot.placed.call(this);
        },

        dispose: function () {
            this._dataset.unregisterObserver(this._observerToken);
        },

        _resetView: function () {
            this._line.setPoints(this._getDataSetPoints());
        },

        _getDataSetPoints: function () {
            var i = 0, max = this._dataset.max;

            return _(this._dataset.data).values().map(function (value) {
                return [60 * i++, -value * 200 / max];
            }, this).flatten().value();
        }
    });

    return {
        VerticalLinePlot: VerticalLinePlot
    };
});