define([
	'lodash',
	'origin',
    'include/code',
    './util',
    './viewcollection',
    './plot'
], function (_, Origin, Code, Util, ViewCollection, Plot) {

	var VerticalBar = Origin.extend({
        _init: function (i, color) {
            this.node = new Kinetic.Group();
            this.bar = new Kinetic.Rect({
                x: i * 60,
                y: 0,
                width: 40,
                height: 0,
                offset: {
                    x: 20,
                    y: 0
                },
                fill: color,
                stroke: 'black',
                strokeWidth: 1
            });
            this.label = new Kinetic.Text({
                x: i * 60,
                y: 20,
                width: 100,
                fontSize: 16,
                offset: {
                    x: 50,
                    y: 8
                },
                fill: 'black',
                align: 'center'
            });
            this.node.add(this.bar);
            this.node.add(this.label);
        },
        dispose: function () {
            this.node.destroy();
        },
        reset: function (value, label, max) {
            Util.changeNode(this.bar, {
                height: value * 200 / max,
                offsetY: value * 200 / max
            });
            this.label.setText(label);
        }
    });

    var HorizontalBar = Origin.extend({
        _init: function (i, color) {
            this.node = new Kinetic.Group();
            this.bar = new Kinetic.Rect({
                x: 0,
                y: i * 40,
                width: 0,
                height: 20,
                offset: {
                    x: 0,
                    y: 10
                },
                fill: color,
                stroke: 'black',
                strokeWidth: 1
            });
            this.label = new Kinetic.Text({
                x: -20,
                y: i * 40,
                width: 100,
                fontSize: 16,
                offset: {
                    x: 50,
                    y: 8
                },
                fill: 'black',
                align: 'center'
            });
            this.node.add(this.bar);
            this.node.add(this.label);
        },
        dispose: function () {
            this.node.destroy();
        },
        reset: function (value, label, max) {
            Util.changeNode(this.bar, {
                width: value * 400 / max
            });
            this.label.setText(label);
        }
    });

    function makeBarChart(plotObj, barObj) {
        return plotObj.extend({
            _init: function (dataset, colors, attrs) {
                plotObj._init.call(this, dataset, attrs);
                this._view = ViewCollection.create(dataset, _.bind(function (i) {
                    return barObj.create(i, colors[i]);
                }, this), Code.delegate('dispose'));
                this.node.add(this._view.node);
            },
            placed: function () {
                plotObj.placed.call(this);
                this._view.placed();
            }
        });
    }

    return {
        VerticalBarChart: makeBarChart(Plot.VerticalPlot,VerticalBar),
        HorizontalBarChart: makeBarChart(Plot.HorizontalPlot,HorizontalBar)
    };


})