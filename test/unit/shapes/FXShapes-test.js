suite('FX Shapes', function(){
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
        stroke: 'red',
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
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,100,20);beginPath();moveTo(0,0);lineTo(-50,86.603);lineTo(50,86.603);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,250,20);beginPath();moveTo(0,0);lineTo(-50,86.603);lineTo(50,86.603);lineTo(0,0);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();save();transform(-1,0,0,-1,175,105);beginPath();moveTo(0,0);lineTo(-50,86.603);lineTo(50,86.603);lineTo(0,0);closePath();fillStyle=blue;fill();lineWidth=4;strokeStyle=red;stroke();restore();');
  });

  // ======================================================

  test('parallelogram', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var parallelogram1 = new Kinetic.Parallelogram({
        x: 10,
        y: 80,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        height: 60,
        width: 100,
        draggable: true
    });

    var parallelogram2 = new Kinetic.Parallelogram({
        x: 280,
        y: 80,
        fill: 'blue',
        stroke: 'red',
        strokeWidth: 4,
        dash: [0.1, 10],
        lineCap: 'round',
        height: 60,
        width: 100,
        draggable: true,
        scale: {x: -1}
    });

    var parallelogram3 = new Kinetic.Parallelogram({
        x: 300,
        y: 120,
        fill: 'red',
        stroke: 'yellow',
        strokeWidth: 4,
        height: 100,
        width: 200,
        draggable: true
    });

    
    stage.add(layer);
    layer.add(parallelogram1);
    layer.add(parallelogram2);
    layer.add(parallelogram3);
    layer.draw();

    assert.equal(parallelogram1.getClassName(), 'Parallelogram');
    assert.equal(parallelogram2.getClassName(), 'Parallelogram');

    assert.equal(parallelogram1.height(), parallelogram2.height());
    assert.equal(parallelogram1.width(), parallelogram2.width());

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,10,80);beginPath();moveTo(0,0);lineTo(100,0);lineTo(130,-60);lineTo(30,-60);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(-1,0,0,1,280,80);beginPath();moveTo(0,0);lineTo(100,0);lineTo(130,-60);lineTo(30,-60);lineTo(0,0);closePath();fillStyle=blue;fill();lineCap=round;setLineDash(0.1,10);lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,300,120);beginPath();moveTo(0,0);lineTo(200,0);lineTo(260,-100);lineTo(60,-100);lineTo(0,0);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();');
  });
});