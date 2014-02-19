define([
    'class',
    'kinetic',
    'jquery',
    'whiteboard',
    'widgets/include/events',
    'widgets/include/patterns/observer',
    'widgets/include/scale',
    'widgets/include/math/misc'
], function (Class,Kinetic,$,Whiteboard,Events,Observer,Scale,MiscMath) {

    var SliderScaleStyle = Class.extend({
        makeLine: function (scale) {
            return new Kinetic.Line({
                points: [scale.tickIndex2Pos(0),0,scale.tickIndex2Pos(1),0],
                stroke: 'black',
                strokeWidth: 4
            });
        },

        hasNumber: function (scale, i, num) {
            return true;
        },

        makeTick: function (scale, i, x) {
            return new Kinetic.Line({
                points: [x,-scale.width,x,0],
                stroke: '#565656',
                strokeWidth: 4,
                lineCap: 'round'
            });
        },

        makeNumber: function (scale, i, x, num) {
            return new Kinetic.Text({
                fontSize: 14,
                fill: '#565656',
                width: 100,
                align: 'center',
                text: Math.round(num).toString(),
                x: x,
                offset: [50,-5],
                fontFamily: 'open_sansregular'
            });
        }
    });

    var SliderScale = Scale.Scale.extend({
        init: function (length, min, max) {
            this._super(10, min, max, length, new SliderScaleStyle());
        },

        num2TickIndex: function (n) {
            return (n - this.min) / (this.max - this.min);
        },

        tickIndex2Num: function (i) {
            return this.min + i * (this.max - this.min);
        }
    });

    var Slider = Class.extend({
        init: function (widget, deflt, length, min, max, attrs) {
            this.initSubject();
            this.widget = widget;
            this._value = deflt;
            this.node = new Kinetic.Group(attrs);
            this._initBackground(length);
            this._initScale(length, min, max);
            this._initHandle();

            this.registerObserver(this.update.bind(this));
        },

        _initBackground: function (length) {
            var w = length + 30, h = 60;
            this.background = new Kinetic.Rect({
                width: w,
                height: h,
                fill: 'white',
                offset: [15, h / 2]
            });
            this.node.add(this.background);
        },

        _initScale: function (length, min, max) {
            this.scale = new SliderScale(length, min, max);
            this.node.add(this.scale.node);
        },

        _initHandle: function () {
            this.handle = this._makeHandle();
            this.handle.addClass('button');
            this.handle.on('pointdown', function () {
                this.widget.beginManipulation();
                Events.hookStageMovement(this._onDragHandle.bind(this), this.widget.endManipulation.bind(this.widget));
            }.bind(this));
            this.node.add(this.handle);
        },

        _makeHandle: function () {
            return new Kinetic.Rect({
                width: 20,
                height: 50,
                offset: [10, 25],
                fill: 'blue'
            });
        },

        placed: function () {
            this.update();
        },

        update: function () {
            this.scale.update();
            this.handle.setPosition({
                x: this.scale.num2Pos(this.value),
                y: 0
            });
            this.node.draw();
        },

        _onDragHandle: function (e) {
            var absoluteMouse = Whiteboard.stage.getPointerPosition();
            var localMouse = this.node.getAbsoluteToLocalSpaceTransform().transformPoint(absoluteMouse);

            this.value = MiscMath.clamp(this.scale.pos2Num(localMouse.x), this.scale.min, this.scale.max);
        }
    });

    Observer.mixinSubject(Slider.prototype);

    Observer.defineNotifyingProperty(Slider.prototype, 'value');

    return Slider;
});
