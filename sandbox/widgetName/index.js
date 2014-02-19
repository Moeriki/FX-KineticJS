'use strict';

define(['lodash', 'kinetic','include/components/button'], function(_, Kinetic, Button) {

    function initCircle() {
        var circle = new Kinetic.Circle({
            radius: 50,
            fill: '#F00'
        });
        var circleButton = Button.wrapButton(circle,400,400,{
            x: 100,
            y: 100,
            draggable: true,
            dragBoundFunc: function(pos) {
                pos.x = 100;
                return pos;
            }
        });

        circle.on('click', function () {
            circle.setFill('green');
            circle.getLayer().batchDraw();
        });

        return circleButton;
    }






    return {
        init: function (attrs) {
            this.node = new Kinetic.Group(attrs);
            this.node.add(initCircle());
        },
        placed: function () {

        },
        destroy: function () {

        }
    }
});
