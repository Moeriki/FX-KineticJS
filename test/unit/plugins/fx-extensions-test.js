/**
    @author Dieter Luypaert <dieter@foursevens.be>
*/

/*globals
    suite:true, test:true, assert:true
*/

'use strict';

suite('FX Extensions', function() {

    suite('Container', function() {

        test('#insert', function() {
            var layer = new Kinetic.Layer();

            for(var i = 0; i < 10; i++) {
                layer.add(new Kinetic.Shape());
            }

            var circle = new Kinetic.Circle();
            layer.insert(circle, 5);
            assert.equal(circle.index, 5);

            var rect = new Kinetic.Rect();
            layer.insert(rect);
            assert.equal(rect.index, 0);
        });

    });

    suite('Node', function() {

        test('#isFirst / #isLast', function() {
            var layer = new Kinetic.Layer();

            var circle = new Kinetic.Circle();
            layer.add(circle);

            var rect = new Kinetic.Rect();
            layer.insert(rect);

            assert.equal(rect.isFirst(), true);
            assert.equal(circle.isLast(), true);
        });

        test('#isOrphan', function() {
            var layer = new Kinetic.Layer();

            var circle = new Kinetic.Circle();
            assert.equal(circle.isOrphan(), true);

            layer.add(circle);
            assert.equal(circle.isOrphan(), false);
        });

        test('#moveBefore / #moveAfter', function() {
            var layer = new Kinetic.Layer();
            for(var i = 0; i < 10; i++) {
                layer.add(new Kinetic.Shape());
            }

            var circle = new Kinetic.Circle();
            layer.insert(circle, 5);

            var rect = new Kinetic.Rect();
            rect.moveAfter(circle);

            assert.equal(circle.index, 5);
            assert.equal(rect.index, 6);

            rect.moveBefore(circle);

            assert.equal(circle.index, 6);
            assert.equal(rect.index, 5);
        });

        test('#next / #previous', function() {
            var layer = new Kinetic.Layer();

            var circle = new Kinetic.Circle();
            layer.add(circle);

            var rect = new Kinetic.Rect();
            layer.add(rect);

            assert.equal(circle.next(), rect);
            assert.equal(rect.previous(), circle);
        });

        test('#siblings', function() {
            var layer = new Kinetic.Layer();
            for(var i = 0; i < 10; i++) {
                layer.add(new Kinetic.Shape());
            }

            var circle = new Kinetic.Circle();
            layer.add(circle);

            assert.equal(circle.siblings().length, 11);
        });

    });

});
