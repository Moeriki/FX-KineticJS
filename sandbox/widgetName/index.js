'use strict';

define(['lodash', 'kinetic','include/components/button', 'include/time/timekeeper', 'include/math/geometry'], function (_, Kinetic, Button, TimeKeeper, GeoMath) {

    var ProtoWidget = {
        _init: function (attrs) {
            this.node = new Kinetic.Group(attrs);
            this._initCircle();
        },

        _initCircle: function () {
            var circle = new Kinetic.Circle({
                radius: 50,
                fill: '#F00'
            });
            var circleButton = Button.wrapButton(circle,400,400,{
                x: 100,
                y: 100
            });

            circle.on('click', function () {
                circle.setFill('green');
                circle.getLayer().batchDraw();
            });

            this.circle = circle;
            this.node.add(circle);
        },

        placed: function () {
            var tk = TimeKeeper.TimeKeeper.create();
            tk.registerObserver(_.bind(function () {
                var v = GeoMath.Vector.create(Math.cos(tk.time.getSeconds()),Math.sin(tk.time.getSeconds()));
                v = v.mulScalar(200);
                this.circle.setPosition(v);
                this.circle.draw();
            }, this));
        },

        destroy: function () {

        }
    };

    function create(attrs) {
        var w = Object.create(ProtoWidget);
        w._init(attrs);
        return w;
    }

    return {
        create: create
    };
});
