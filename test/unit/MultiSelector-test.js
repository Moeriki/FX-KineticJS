suite('MultiSelector', function() {

  // ======================================================
  test('parent relation', function() {
    var stage = addStage();

    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group({
        name: 'foo'
    });
    var group2 = new Kinetic.Group({
        name: 'bar'
    });
    var group3 = new Kinetic.Group({
        name: 'bar'
    });
    var group4 = new Kinetic.Group({
        name: 'too'
    });
    var group5 = new Kinetic.Group({
        name: 'bar'
    });
    var group6 = new Kinetic.Group({
        name: 'tru'
    });
    var group7 = new Kinetic.Group({
        name: 'bar'
    });

    group.add(group2);
    group.add(group3);
    group3.add(group7);

    group4.add(group5);
    group4.add(group6);

    layer.add(group);
    layer.add(group4);

    var test1res = layer.find('.foo > .bar');
    assert.equal(test1res.length, 2);
    assert.equal(test1res[0], group2);
    assert.equal(test1res[1], group3);
  });

  // ======================================================
  test('ancestor relation', function() {
    var stage = addStage();

    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group({
        name: 'foo'
    });
    var group2 = new Kinetic.Group({
        name: 'bar'
    });
    var group3 = new Kinetic.Group({
        name: 'bar'
    });
    var group4 = new Kinetic.Group({
        name: 'too'
    });
    var group5 = new Kinetic.Group({
        name: 'bar'
    });
    var group6 = new Kinetic.Group({
        name: 'tru'
    });
    var group7 = new Kinetic.Group({
        name: 'bar'
    });

    group.add(group2);
    group.add(group3);
    group3.add(group7);

    group4.add(group5);
    group4.add(group6);

    layer.add(group);
    layer.add(group4);

    var test1res = layer.find('.foo .bar');
    assert.equal(test1res.length, 3);
    assert.equal(test1res[0], group2);
    assert.equal(test1res[1], group3);
    assert.equal(test1res[2], group7);
  });

  // ======================================================
  test('sibling relation', function() {
    var stage = addStage();

    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group({
        name: 'foo'
    });
    var group2 = new Kinetic.Group({
        name: 'bar'
    });
    var group3 = new Kinetic.Group({
        name: 'bar'
    });
    var group4 = new Kinetic.Group({
        name: 'too'
    });
    var group5 = new Kinetic.Group({
        name: 'bar'
    });
    var group6 = new Kinetic.Group({
        name: 'tru'
    });
    var group7 = new Kinetic.Group({
        name: 'bar'
    });

    group.add(group2);
    group.add(group3);
    group3.add(group7);

    group4.add(group5);
    group4.add(group6);

    layer.add(group);
    layer.add(group4);

    var test1res = layer.find('.bar + .bar');
    assert.equal(test1res.length, 2);
    assert.equal(test1res[0], group2);
    assert.equal(test1res[1], group3);
  });

  // ======================================================
  test('mix of all relations', function() {
    var stage = addStage();

    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group({
        name: 'foo'
    });
    var group2 = new Kinetic.Group({
        name: 'bar'
    });
    var group3 = new Kinetic.Group({
        name: 'bar'
    });
    var group4 = new Kinetic.Group({
        name: 'too'
    });
    var group5 = new Kinetic.Group({
        name: 'bar'
    });
    var group6 = new Kinetic.Group({
        name: 'tru'
    });
    var group7 = new Kinetic.Group({
        name: 'bar'
    });

    group.add(group2);
    group.add(group3);
    group3.add(group7);

    group4.add(group5);
    group4.add(group6);

    layer.add(group);
    layer.add(group4);

    var test1res = layer.find('.foo > .bar, .foo .bar, .bar + .bar');
    assert.equal(test1res.length, 7);
    assert.equal(test1res[0], group2);
    assert.equal(test1res[1], group3);
    assert.equal(test1res[2], group2);
    assert.equal(test1res[3], group3);
    assert.equal(test1res[4], group7);
    assert.equal(test1res[5], group2);
    assert.equal(test1res[6], group3);
  });
});






