suite('Triangle', function(){
  // ======================================================

  test('isosceles triangle', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var triangle0 = new Kinetic.TriangleIsosceles({
        x: 50,
        y: 20,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        height: 100,
        width: 50,
        draggable: true
    });

    var triangle1 = new Kinetic.TriangleIsosceles({
        x: 110,
        y: 115,
        fill: 'blue',
        stroke: 'red',
        strokeWidth: 4,
        height: 100,
        width: 50,
        draggable: true,
        scale: {x: -1, y: -1}
    });

    var triangle2 = new Kinetic.TriangleIsosceles({
        x: 170,
        y: 20,
        fill: 'red',
        stroke: 'yellow',
        strokeWidth: 4,
        height: 150,
        width: 50,
        draggable: true
    });

    stage.add(layer);
    layer.add(triangle0);
    layer.add(triangle1);
    layer.add(triangle2);
    layer.draw();

    assert.equal(triangle0.getClassName(), 'TriangleIsosceles');
    assert.equal(triangle1.getClassName(), 'TriangleIsosceles');
    assert.equal(triangle2.getClassName(), 'TriangleIsosceles');

    assert.equal(triangle0.getHeight(), triangle1.getHeight());
    assert.equal(triangle0.getWidth(), triangle1.getWidth());

    assert.equal(triangle0.getWidth(), triangle2.getWidth());
    assert.equal(triangle1.getWidth(), triangle2.getWidth());
    assert.equal(triangle0.getHeight() + 50, triangle2.getHeight());

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,50,20);beginPath();moveTo(0,0);lineTo(-25,100);lineTo(25,100);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(-1,0,0,-1,110,115);beginPath();moveTo(0,0);lineTo(-25,100);lineTo(25,100);lineTo(0,0);closePath();fillStyle=blue;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,170,20);beginPath();moveTo(0,0);lineTo(-25,150);lineTo(25,150);lineTo(0,0);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();');
  });

  // ======================================================

  test('right-angled triangle', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var triangle0 = new Kinetic.TriangleRightAngled({
        x: 20,
        y: 20,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        height: 50,
        width: 100,
        draggable: true
    });

    var triangle1 = new Kinetic.TriangleRightAngled({
        x: 140,
        y: 70,
        fill: 'blue',
        stroke: 'red',
        strokeWidth: 4,
        height: 50,
        width: 100,
        draggable: true,
        scale: {x: -1, y: -1}
    });

    var triangle2 = new Kinetic.TriangleRightAngled({
        x: 170,
        y: 20,
        fill: 'red',
        stroke: 'yellow',
        strokeWidth: 4,
        height: 100,
        width: 100,
        draggable: true
    });

    stage.add(layer);
    layer.add(triangle0);
    layer.add(triangle1);
    layer.add(triangle2);
    layer.draw();

    assert.equal(triangle0.getClassName(), 'TriangleRightAngled');
    assert.equal(triangle1.getClassName(), 'TriangleRightAngled');
    assert.equal(triangle2.getClassName(), 'TriangleRightAngled');

    assert.equal(triangle0.getHeight(), triangle1.getHeight());
    assert.equal(triangle0.getWidth(), triangle1.getWidth());

    assert.equal(triangle0.getWidth(), triangle2.getWidth());
    assert.equal(triangle1.getWidth(), triangle2.getWidth());
    assert.equal(triangle0.getHeight() * 2, triangle2.getHeight());

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,20,20);beginPath();moveTo(0,0);lineTo(0,50);lineTo(100,50);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(-1,0,0,-1,140,70);beginPath();moveTo(0,0);lineTo(0,50);lineTo(100,50);lineTo(0,0);closePath();fillStyle=blue;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,170,20);beginPath();moveTo(0,0);lineTo(0,100);lineTo(100,100);lineTo(0,0);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();');
  });
  
  // ======================================================

  test('equilateral triangle', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var triangle0 = new Kinetic.TriangleEquilateral({
        x: 100,
        y: 20,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        draggable: true,
        side: 100
    });

    var triangle1 = new Kinetic.TriangleEquilateral({
        x: 250,
        y: 20,
        fill: 'red',
        stroke: 'yellow',
        strokeWidth: 4,
        draggable: true,
        height: 100 * (Math.sqrt(3)/2)
    });

    var triangle2 = new Kinetic.TriangleEquilateral({
        x: 175,
        y: 105,
        fill: 'blue',
        stroke: 'yellow',
        strokeWidth: 4,
        draggable: true,
        width: 100,
        scale: {x: -1, y: -1}
    });

    stage.add(layer);
    layer.add(triangle0);
    layer.add(triangle1);
    layer.add(triangle2);
    layer.draw();

    assert.equal(triangle0.getClassName(), 'TriangleEquilateral');
    assert.equal(triangle1.getClassName(), 'TriangleEquilateral');

    assert.equal(triangle0.getHeight(), triangle1.getHeight());
    assert.equal(triangle0.getWidth(), triangle1.getWidth());
    assert.equal(triangle0.getSide(), triangle1.getSide());

    assert.equal(triangle1.getHeight(), triangle2.getHeight());
    assert.equal(triangle1.getWidth(), triangle2.getWidth());
    assert.equal(triangle1.getSide(), triangle2.getSide());


    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,100,20);beginPath();moveTo(0,0);lineTo(-50,86.603);lineTo(50,86.603);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,250,20);beginPath();moveTo(0,0);lineTo(-50,86.603);lineTo(50,86.603);lineTo(0,0);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();save();transform(-1,0,0,-1,175,105);beginPath();moveTo(0,0);lineTo(-50,86.603);lineTo(50,86.603);lineTo(0,0);closePath();fillStyle=blue;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();');
  });
});