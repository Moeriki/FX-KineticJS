/**
    @author Dieter Luypaert <dieterluypaert@gmail.com>
*/

/*globals suite:true, test:true, assert:true*/

suite('Kizzle', function() {
    'use strict';

    var kizz = Kinetic.Kizzle;

    test('parse id', function() {
        var k;

        k = kizz('#testId');
        assert.equal(k.id, 'testId');

        k = kizz('Rect#testId');
        assert.equal(k.id, 'testId');

        k = kizz('#testId.name');
        assert.equal(k.id, 'testId');

        k = kizz('#testId[attr]');
        assert.equal(k.id, 'testId');

        k = kizz('#testId[attr]');
        assert.equal(k.id, 'testId');

        k = kizz('#testId.name[attr]');
        assert.equal(k.id, 'testId');

        k = kizz('Rect#testId.name');
        assert.equal(k.id, 'testId');
    });

    test('parse name', function() {
        var k;

        k = kizz('.testName');
        assert.equal(k.name, 'testName');

        k = kizz('Rect.testName');
        assert.equal(k.name, 'testName');

        k = kizz('#id.testName');
        assert.equal(k.name, 'testName');

        k = kizz('.testName[attr]');
        assert.equal(k.name, 'testName');

        k = kizz('#id.testName[attr]');
        assert.equal(k.name, 'testName');

        k = kizz('Rect.testName[attr]');
        assert.equal(k.name, 'testName');
    });

    test('parse attributes', function() {
        var k;

        k = kizz('[attrName]');
        assert.equal(k.attrs.length, 1);
        assert.equal(k.attrs[0].length, 1);

        k = kizz('#id[attrName]');
        assert.equal(k.attrs.length, 1);
        assert.equal(k.attrs[0].length, 1);

        k = kizz('.name[attrName]');
        assert.equal(k.attrs.length, 1);
        assert.equal(k.attrs[0].length, 1);

        k = kizz('[attrName=val]');
        assert.equal(k.attrs[0].length, 2);

        k = kizz('[attrName=val]');
        assert.equal(k.attrs[0].length, 2);
        assert.equal(k.attrs[0][0], 'attrName');
        assert.equal(k.attrs[0][1], 'val');

        k = kizz('[attrName=4]');
        assert.equal(k.attrs[0][1], 4);

        k = kizz('[attrName=true]');
        assert.equal(k.attrs[0][1], true);

        k = kizz('[attrName=false]');
        assert.equal(k.attrs[0][1], false);
    });

    test('match id', function() {
        var k, node;

        k = kizz('#id');

        node = new Kinetic.Rect({id: 'id'});
        assert.equal(k.match(node, {id: true}), true);

        node = new Kinetic.Rect({id: 'otherId'});
        assert.equal(k.match(node, {id: true}), false);
    });

    test('match name', function() {
        var k, node;

        k = kizz('.name');

        node = new Kinetic.Rect({name: 'name'});
        assert.equal(k.match(node, {name: true}), true);

        node = new Kinetic.Rect({name: 'otherName'});
        assert.equal(k.match(node, {name: true}), false);
    });

    test('match attrs truthy', function() {
        var node, k;

        node = new Kinetic.Rect({
            id: 'test',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            visible: true,
            listening: false,
        });

        k = kizz('[id]');
        assert.equal(k.match(node), true);

        k = kizz('[x]');
        assert.equal(k.match(node), false);

        k = kizz('[width]');
        assert.equal(k.match(node), true);

        k = kizz('[offsetX]');
        assert.equal(k.match(node), false);

        k = kizz('[!listening]');
        assert.equal(k.match(node), true);

        k = kizz('[!visible]');
        assert.equal(k.match(node), false);
    });

    test('match attrs val', function() {
        var node, k;

        node = new Kinetic.Rect({
            id: 'test',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            visible: true,
            listening: false,
        });

        k = kizz('[x=0]');
        assert.equal(k.match(node), true);

        k = kizz('[width=101]');
        assert.equal(k.match(node), false);

        k = kizz('[listening=false]');
        assert.equal(k.match(node), true);

        k = kizz('[id=test]');
        assert.equal(k.match(node), true);

        k = kizz('[name=anything]');
        assert.equal(k.match(node), false);

        k = kizz('[id=test,width=100]');
        assert.equal(k.match(node), true);

        k = kizz('[id=test,width=100,height=101]');
        assert.equal(k.match(node), false);
    });

    test('getChildren with multiple selectors', function() {

        var stage = addStage();
        var layer = new Kinetic.Layer();

        var group1 = new Kinetic.Group({
            id: 'group1',
        });
        var group2 = new Kinetic.Group({
            id: 'group2',
        });

        layer.add(group1);
        layer.add(group2);
        stage.add(layer);

        assert.equal(layer.getChildren('#group1, #group2').length, 2);
    });

    test('#next / #previous', function() {
        var layer = new Kinetic.Layer();

        var circle = new Kinetic.Circle();
        layer.add(circle);

        var rect = new Kinetic.Rect();
        layer.add(rect);

        assert.equal(circle.getNext(), rect);
        assert.equal(rect.getPrevious(), circle);
    });

    test('#siblings', function() {
        var layer = new Kinetic.Layer();
        for(var i = 0; i < 10; i++) {
            layer.add(new Kinetic.Shape());
        }

        var circle = new Kinetic.Circle();
        layer.add(circle);

        assert.equal(circle.getSiblings().length, 11);
    });

    test('#first');

    test('#last');

});
