define([
	'lodash',
    'origin',
	'include/code',
    'include/math/basic',
    'include/math/geometry',
    'include/arrays',
    './util'
], function (_, Origin, Code, BasicMath, GeoMath, Arrays, Util) {
    var PiePart = Origin.extend({
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

            Util.changeNode(this.wedge, {
                rotation: rotation * 360 / GeoMath.TAU,
                angle: angle * 360 / GeoMath.TAU
            });
            this.label.setText(label);
            Util.changeNode(this.label, {
                x: 120 * Math.cos(angleMiddle),
                y: 120 * Math.sin(angleMiddle),
                align: isMiddleOnLeftSide ? 'left' : 'right' 
            });
        }
    });

    return Origin.extend({
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

        placed: function () {
            this.update();
        },

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
    });

});