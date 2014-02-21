'use strict';

define(['lodash', 'kinetic','include/components/button'], function (_, Kinetic, Button) {

    function initCircle() {
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

        return circleButton;
    }

    function placed() {

    }

    function destroy() {

    }

    var ProtoWidget = {
        placed: placed,
        destroy: destroy
    };

    function create(attrs) {
        var w = Object.create(ProtoWidget);
        w.node = new Kinetic.Group(attrs);
        w.node.add(initCircle());
        return w;
    }

    return {
        create: create
    };
});
