'use strict';

require(['lodash', 'kinetic'], function(_, Kinetic) {

    var stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
    });

    var layer = new Kinetic.Layer({
        width: stage.getWidth(),
        height: stage.getHeight(),
    });

    stage.add(layer);

    var group = new Kinetic.Group({
        width: layer.getWidth(),
        height: layer.getHeight(),
    });

    layer.add(group);

    var circle = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 50,
        fill: '#F00',
    });

    group.add(circle);

    stage.draw();

});
