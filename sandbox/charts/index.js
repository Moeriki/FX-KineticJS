/**
 @author: Ruben Tytgat
*/
define([
    'lodash',
    'jquery',
    'kinetic',
    'include/code',
    'include/math/basic',
    'include/math/geometry',
    'include/arrays',
    'include/patterns/observer',
    'include/components/scale'
], function (_,$,Kinetic,Code,BasicMath,GeoMath,Arrays,Observer,Scale) {
    'use strict';

    var colors = ['#343745','#FEC436','#2AB69D','#E75849','#7BBADE','#93DE7F','#FFED5D','#F29E4A','#FF7050'];

    var ProtoTable = {
        _tableTemplate: _.template('\
            <table class="widgets-charts-datatable">\
                <thead>\
                    <th>&nbsp;</th>\
                    <th>Name</th>\
                    <th>Value</th>\
                </thead>\
                <tbody>\
                    <% var i = 1; %>\
                    <% _(dataset).forOwn(function (value, label) { %>\
                        <tr>\
                            <td><%- i++ %></td>\
                            <td><%- label %></td>\
                            <td><%- value %></td>\
                        </tr>\
                    <% }); %>\
                </tbody>\
                <tfoot>\
                    <tr>\
                        <form name="data-adder">\
                            <td><input type="submit" value="Add" /></td>\
                            <td><input name="label" type="text" /></td>\
                            <td><input name="value" type="text" /></td>\
                        </form>\
                    </tr>\
                </tfoot>\
            </table>'),

        _init: function (dataset, x, y) {
            this.domObj = $(document.createElement('div'));
            this.domObj.css({
                position: 'absolute',
                left: x,
                top: y,
                overflow: 'scroll',
                maxHeight: 200
                //width: 600,
                //height: 400
            });
            
            this._dataset = dataset;
            this._observerToken = this._dataset.registerObserver(_.bind(this.update,this));
            $(document.body).append(this.domObj);
        },

        update: function () {
            this.domObj.html(this._tableTemplate({ dataset: this._dataset.data }));
            this.domObj.find('[name="data-adder"]').on('submit', _.bind(function () {
                var label = this.domObj.find('[name="label"]').first().val();
                var value = parseFloat(this.domObj.find('[name="value"]').first().val());

                if(label == null || isNaN(value))
                    return false;

                this._dataset.set(label, value);
                this.domObj.find('[name="label"]').focus();
                return false;
            },this));
        },

        dispose: function () {
            this._dataset.unregisterObserver(this._observerToken);
            this.domObj.remove();
        }
    };
    var Table = {
        create: Code.instancer(ProtoTable)
    };

    var ProtoPiePart = {
        _init: function (color) {
            this.node = new Kinetic.Group();
            this.wedge = new Kinetic.Wedge({
                radius: 100,
                fill: color,
                stroke: 'black',
                strokeWidth: 1,
                angle: 0,
                rotation: 360
            });
            this.label = new Kinetic.Text({
                width: 100,
                fontSize: 16,
                offset: {
                    x: 50,
                    y: 8
                },
                fill: 'black',
                align: 'center',
                x: 120,
                y: 0
            });
            this.node.add(this.wedge);
            this.node.add(this.label);
        },
        dispose: function () {
            this.node.destroy();
        },
        reset: function (data,frac,label,rotation,angle) {
            var angleMiddle = rotation + angle / 2;
            var isMiddleOnLeftSide = 180 - Math.abs(Math.cos(angleMiddle)) > 0;

            this.wedge.tweenTo({
                easing: Kinetic.Easings.EaseOut,
                duration: 0.5,
                rotation: rotation * 360 / GeoMath.TAU,
                angle: angle * 360 / GeoMath.TAU
            });
            this.label.setText(label);
            this.label.tweenTo({
                easing: Kinetic.Easings.EaseOut,
                duration: 0.5,
                x: 120 * Math.cos(angleMiddle),
                y: 120 * Math.sin(angleMiddle),
                align: isMiddleOnLeftSide ? 'left' : 'right' 
            });
        }
    };
    var PiePart = {
        create: Code.instancer(ProtoPiePart)
    };

    var ProtoPieChart = {
        _init: function (dataset, colors, attrs) {
            this.dataset = dataset;
            this._observerToken = dataset.registerObserver(_.bind(this.update, this));
            this._pieparts = [];
            this._colors = colors;

            this._initNode(attrs);
        },

        _initNode: function (attrs) {
            this.node = new Kinetic.Group(attrs);
            this.partsNode = new Kinetic.Group();
            this.node.add(this.partsNode);
        },

/*        _initBackground: function () {
            this.background = new Kinetic.Circle({
                radius: 100,
                fill: 'gray',
                stroke: 'black',
                strokeWidth: 3
            });
        },
*/
        update: function () {
            this._resetWedges();
        },

        _resetWedges: function() {
            var currentRotation = 0, i = 0;
            var total = BasicMath.sum(_.values(this.dataset.data));

            this._resizePiePartsArray();

            _.forOwn(this.dataset.data, function (value,label) {
                var fraction = value / total;
                var angle = fraction * GeoMath.TAU;
                
                this._pieparts[i++].reset(value, fraction, label, currentRotation, angle);

                currentRotation += angle;
            }.bind(this));
        },

        _resizePiePartsArray: function () {
            Arrays.resize(this._pieparts, _.keys(this.dataset.data).length, function (i) {
                var part = PiePart.create(this._colors[i]);
                this.partsNode.add(part.node);
                return part;
            }.bind(this), Code.delegate('dispose'));
        }
    };
    var PieChart = {
        create: Code.instancer(ProtoPieChart)
    };

    var ProtoBar = {
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
        reset: function (data,frac,label) {
            this.bar.tweenTo({
                easing: Kinetic.Easings.EaseOut,
                duration: 0.5,
                height: frac * 200,
                offsetY: frac * 200
            });
            this.label.setText(label);
        }
    };
    var Bar = {
        create: Code.instancer(ProtoBar)
    };

    var BarChartScaleStyle = {
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
    };
    var ProtoBarChartScale = Object.create(Scale.ProtoScale);
    Code.mixin(ProtoBarChartScale, {
        num2TickIndex: function (n) {
            return Math.round(n / this._step);
        },
        tickIndex2Num: function (i) {
            return i * this._step;
        },
        get _step () {
            // Strategy 1: round the step.
            //var unroundedStep = Math.round(this.max / 5);
            //var ordersOfMagnitude = Math.floor(Math.log(unroundedStep) / Math.LN10);
            //var step = Math.pow(10, ordersOfMagnitude) * Math.ceil(2 * unroundedStep / Math.pow(10, ordersOfMagnitude)) / 2;

            // Strategy 2: round the maximum.
            //var maxOOM = Math.floor(Math.log(this.max) / Math.LN10);
            //var roundedMax = Math.pow(10, maxOOM) * Math.round(this.max / Math.pow(10, maxOOM));
            //var step = roundedMax / 5;

            // Strategy 3: round both.
            var maxOOM = Math.floor(Math.log(this.max) / Math.LN10);
            var roundedMax = Math.pow(10, maxOOM) * Math.round(this.max / Math.pow(10, maxOOM));
            var unroundedStep = roundedMax / 5;
            var ordersOfMagnitude = Math.floor(Math.log(unroundedStep) / Math.LN10);
            var step = Math.pow(10, ordersOfMagnitude + 1) * Math.ceil(2 * unroundedStep / Math.pow(10, ordersOfMagnitude + 1)) / 2;

            console.log("OOM: %i, RMAX: %i, URSTEP: %i, STEPOOM: %i, STEP: %i", maxOOM, roundedMax, unroundedStep, ordersOfMagnitude, step)


            return step;
        }
    });
    var BarChartScale = {
        create: Code.instancer(ProtoBarChartScale)
    };
    var ProtoBarChart = {
        _init: function (dataset, colors, attrs) {
            this.dataset = dataset;
            this._observerToken = dataset.registerObserver(_.bind(this.update, this));
            this._bars = [];
            this._colors = colors;
            this._scale = BarChartScale.create(400, 0, 50, 200 / 5, BarChartScaleStyle);

            this._initNode(attrs);
        },

        _initNode: function (attrs) {
            this.node = new Kinetic.Group(attrs);
            this.barsNode = new Kinetic.Group();
            this.node.add(this._scale.node);
            this.node.add(this.barsNode);
        },

        _resetBars: function () {
            var i = 0;
            var height = Math.max.apply(Math, _.values(this.dataset.data));

            this._resizeBarsArray();

            _.forOwn(this.dataset.data, function (value, label) {
                var barRatio = value / height;

                this._bars[i++].reset(value, barRatio, label);
            }.bind(this));
        },

        _resizeBarsArray: function () {
            Arrays.resize(this._bars, _.keys(this.dataset.data).length, function (i) {
                var bar = Bar.create(i, this._colors[i]);
                this.barsNode.add(bar.node);
                return bar;
            }.bind(this), Code.delegate('dispose'));
        },

        update: function () {
            this._resetBars();

            var height = Math.max.apply(Math, _.values(this.dataset.data));
            this._scale.max = height;
            this._scale.density = 200 * this._scale._step / height;
            this._scale.update();
        }
    };
    var BarChart = {
        create: Code.instancer(ProtoBarChart)
    };

    var ProtoDataset = {
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
        }
    };

    Observer.mixinSubject(ProtoDataset);
    Observer.defineNotifyingProperty(ProtoDataset, 'data');

    var Dataset = {
        create: Code.instancer(ProtoDataset)
    };


    var ProtoWidget = {
        _init: function (attrs) {
            this.node = new Kinetic.Group(Code.mixin(attrs, {
                width: 800,
                height: 500
            }));
            var data = Dataset.create({
                Maximan: 40,
                Mushimush: 23,
                Totsitots: 54
            });
            var colrs = _.shuffle(colors);
            this.test = PieChart.create(data, colrs);
            this.test2 = Table.create(data, 0, 200);
            this.test3 = BarChart.create(data, colrs, {
                x: -100,
                y: -200
            });
            this.node.add(this.test.node);
            this.node.add(this.test3.node);
            this.node.on('click',function () {
                this.test.dataset.set('Mushimush', this.test.dataset.get('Mushimush') + 30);
            }.bind(this));
        },

        placed: function () {
            console.log('placed');
            this.test.update();
            this.test2.update();
            this.test3.update();
        }
    };

    return {
        create: Code.instancer(ProtoWidget)
    };
});
