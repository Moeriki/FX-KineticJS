define([
	'origin',
    'include/code',
    './util',
    './plot',
    './viewcollection'
], function (Origin, Code, Util, Plot, ViewCollection) {
	
	var VerticalScatterPoint = Origin.extend({
        _init: function (i, color) {
            this.node = new Kinetic.Circle({
                radius: 5,
                fill: color,
                x: i * 60
            });
        },

        reset: function (value, label, max) {
            Util.changeNode(this.node, {
                y: -value * 200 / max
            });
        }
    });

    var HorizontalScatterPoint = Origin.extend({
        _init: function (i, color) {
            this.node = new Kinetic.Circle({
                radius: 5,
                fill: color,
                y: i * 40
            });
        },

        reset: function (value, label, max) {
            Util.changeNode(this.node, {
                x: value * 400 / max
            });
        }
    });

    function makeScatterPlot(plotObj, pointObj) {
        return plotObj.extend({
            _init: function (dataset, colors, attrs) {
                plotObj._init.call(this, dataset, attrs);
                this._view = ViewCollection.create(dataset, _.bind(function (i) {
                    return pointObj.create(i, colors[i]);
                }, this), Code.delegate('dispose'));
                this.node.add(this._view.node);
            },
            placed: function () {
                plotObj.placed.call(this);
                this._view.placed();
            }
        });
    }

    var VerticalScatterPlot = makeScatterPlot(Plot.VerticalPlot,VerticalScatterPoint);
    var HorizontalScatterPlot = makeScatterPlot(Plot.HorizontalPlot,HorizontalScatterPoint);

    return {
        VerticalScatterPlot: VerticalScatterPlot,
        HorizontalScatterPlot: HorizontalScatterPlot
    };
});
