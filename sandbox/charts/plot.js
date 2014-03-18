define([
	'origin',
    'include/components/scale'
], function (Origin, Scale) {

    var VerticalPlotScaleStyle = Origin.extend({
        makeLine: function () {
            return null;
        },
        makeTick: function (scale, i, x) {
            return new Kinetic.Line({
                points: [-30,-x,scale.width - 30,-x],
                stroke: 'lightgray',
                strokeWidth: 2
            });
        },
        makeNumber: function (scale, i, x, n) {
            return new Kinetic.Text({
                x: -40,
                y: -x,
                width: 100,
                fontSize: 16,
                offset: {
                    x: 100,
                    y: 8
                },
                text: Math.round(n).toString(),
                fill: 'gray',
                align: 'right'
            });
        },
        hasNumber: function (scale, i, n) {
            return true;
        }
    });
    var HorizontalPlotScaleStyle = Origin.extend({
        makeLine: function () {
            return null;
        },
        makeTick: function (scale, i, x) {
            return new Kinetic.Line({
                points: [x,-30,x,scale.width - 30],
                stroke: 'lightgray',
                strokeWidth: 2
            });
        },
        makeNumber: function (scale, i, x, n) {
            return new Kinetic.Text({
                x: x,
                y: -40,
                width: 100,
                fontSize: 16,
                offset: {
                    x: 100,
                    y: 8
                },
                text: Math.round(n).toString(),
                fill: 'gray',
                align: 'right'
            });
        },
        hasNumber: function (scale, i, n) {
            return true;
        }
    });

    var PlotScale = Scale.Scale.extend({
        _init: function (dataset, width, height, scaleStyle, attrs) {
            Scale.Scale._init.call(this, width, 0, 50, height / 5, scaleStyle, attrs);

            this._desiredHeight = height;
            this._dataset = dataset;
            this._observerToken = dataset.registerObserver(_.bind(this.update, this));
        },
        placed: function () {
            this.update();
        },
        dispose: function () {
            this._dataset.unregisterObserver(this._observerToken);
        },
        num2TickIndex: function (n) {
            return n / this._step;
        },
        tickIndex2Num: function (i) {
            return i * this._step;
        },
        update: function () {
            var height = Math.max.apply(Math, _.values(this._dataset.data));
            this.max = height;
            this.density = this._desiredHeight * this._step / height;

            Scale.Scale.update.call(this);
        },
        get _step () {
            // Strategy 1: round the step.
            //var unroundedStep = Math.round(this.max / 5);
            //var ordersOfMagnitude = Math.floor(Math.log(unroundedStep) / Math.LN10);
            //var step = Math.pow(10, ordersOfMagnitude) * Math.ceil(2 * unroundedStep / Math.pow(10, ordersOfMagnitude)) / 2;

            // Strategy 2: round the maximum.
            var maxOOM = Math.floor(Math.log(this.max) / Math.LN10);
            var roundedMax = Math.pow(10, maxOOM) * Math.round(this.max / Math.pow(10, maxOOM));
            var step = roundedMax / 5;

            // Strategy 3: round both.
            //var maxOOM = Math.floor(Math.log(this.max) / Math.LN10);
            //var roundedMax = Math.pow(10, maxOOM) * Math.round(this.max / Math.pow(10, maxOOM));
            //var unroundedStep = roundedMax / 5;
            //var ordersOfMagnitude = Math.floor(Math.log(unroundedStep) / Math.LN10);
            //var step = Math.pow(10, ordersOfMagnitude + 1) * Math.ceil(2 * unroundedStep / Math.pow(10, ordersOfMagnitude + 1)) / 2;

            //console.log("OOM: %i, RMAX: %i, URSTEP: %i, STEPOOM: %i, STEP: %i", maxOOM, roundedMax, unroundedStep, ordersOfMagnitude, step)


            return step;
        }
    });

    var VerticalPlotScale = PlotScale.extend({
        _init: function (dataset, attrs) {
            PlotScale._init.call(this, dataset, 400, 200, VerticalPlotScaleStyle, attrs);
        }
    });
    var HorizontalPlotScale = PlotScale.extend({
        _init: function (dataset, attrs) {
            PlotScale._init.call(this, dataset, 200, 400, HorizontalPlotScaleStyle, attrs);
        }
    });

    var Plot = Origin.extend({
        _init: function (dataset, attrs) {
            this.dataset = dataset;
            this._scale = this._protoScale.create(dataset);

            this._initNode(attrs);
        },

        _initNode: function (attrs) {
            this.node = new Kinetic.Group(attrs);
            this.node.add(this._scale.node);
        },

        placed: function () {
            this._scale.placed();
        }
    });
    var VerticalPlot = Plot.extend({
        _protoScale: VerticalPlotScale
    });
    var HorizontalPlot = Plot.extend({
        _protoScale: HorizontalPlotScale
    });

    return {
        VerticalPlot: VerticalPlot,
        HorizontalPlot: HorizontalPlot
    };
});