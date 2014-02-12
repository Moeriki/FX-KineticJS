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

  test('square', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var square1 = new Kinetic.Square({
        x: 10,
        y: 10,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        width: 100,
        draggable: true 
    });
    
    stage.add(layer);
    layer.add(square1);
    

    assert.equal(square1.getClassName(), 'Square');
    assert.equal(square1.getWidth(), square1.getHeight());
    assert.equal(square1.lockRatio(), true);

    square1.height(110);
    assert.equal(square1.getWidth(), 110);

    square1.lockRatio(false);
    square1.height(120);
    assert.equal(square1.getWidth(), 110);

    square1.lockRatio(true);
    square1.height(150);
    assert.equal(square1.getWidth(), 150);

    layer.draw();

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,10,10);beginPath();rect(0,0,150,150);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();');
  });

  // ======================================================

  test('diamond', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var diamond1 = new Kinetic.Diamond({
        x: 10,
        y: 70,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        height: 60,
        width: 120,
        draggable: true
    });

    var diamond2 = new Kinetic.Diamond({
        x: 180,
        y: 10,
        fill: 'blue',
        stroke: 'red',
        strokeWidth: 4,
        height: 60,
        width: 120,
        draggable: true,
        rotation: 90
    });
    
    stage.add(layer);
    layer.add(diamond1);
    layer.add(diamond2);

    layer.draw();

    assert.equal(diamond1.getClassName(), 'Diamond');
    assert.equal(diamond2.getClassName(), 'Diamond');

    assert.equal(diamond1.height(), diamond2.height());
    assert.equal(diamond1.width(), diamond2.width());

    assert.equal(diamond2.rotation(), 90);

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,10,70);beginPath();moveTo(0,0);lineTo(60,-30);lineTo(120,0);lineTo(60,30);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(0,1,-1,0,180,10);beginPath();moveTo(0,0);lineTo(60,-30);lineTo(120,0);lineTo(60,30);lineTo(0,0);closePath();fillStyle=blue;fill();lineWidth=4;strokeStyle=red;stroke();restore();');
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
  
  // ======================================================

  test('trapezoid', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var trapezoid1 = new Kinetic.Trapezoid({
        x: 10,
        y: 80,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        height: 60,
        width: 100,
        draggable: true
    });

    var trapezoid2 = new Kinetic.Trapezoid({
        x: 150,
        y: 20,
        fill: 'blue',
        stroke: 'red',
        strokeWidth: 4,
        dash: [0.1, 10],
        lineCap: 'round',
        height: 60,
        width: 100,
        draggable: true,
        scale: {y: -1}
    });

    var trapezoid3 = new Kinetic.Trapezoid({
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
    layer.add(trapezoid1);
    layer.add(trapezoid2);
    layer.add(trapezoid3);
    layer.draw();

    assert.equal(trapezoid1.getClassName(), 'Trapezoid');
    assert.equal(trapezoid2.getClassName(), 'Trapezoid');
    assert.equal(trapezoid3.getClassName(), 'Trapezoid');

    assert.equal(trapezoid1.height(), trapezoid2.height());
    assert.equal(trapezoid1.width(), trapezoid2.width());

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,10,80);beginPath();moveTo(0,0);lineTo(100,0);lineTo(75,-60);lineTo(25,-60);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,-1,150,20);beginPath();moveTo(0,0);lineTo(100,0);lineTo(75,-60);lineTo(25,-60);lineTo(0,0);closePath();fillStyle=blue;fill();lineCap=round;setLineDash(0.1,10);lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,300,120);beginPath();moveTo(0,0);lineTo(200,0);lineTo(150,-100);lineTo(50,-100);lineTo(0,0);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();');
  });
  
  // ======================================================

  test('semi-circle', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var semiCircle1 = new Kinetic.SemiCircle({
        x: 70,
        y: 10,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        radius: 50,
        draggable: true 
    });
    var semiCircle2 = new Kinetic.SemiCircle({
        x: 190,
        y: 10,
        fill: 'red',
        stroke: 'yellow',
        strokeWidth: 4,
        height: 50,
        draggable: true 
    });
    
    stage.add(layer);
    layer.add(semiCircle1);
    layer.add(semiCircle2);
    layer.draw();

    assert.equal(semiCircle1.getClassName(), 'SemiCircle');
    assert.equal(semiCircle1.getWidth(), 100);
    assert.equal(semiCircle1.getHeight(), 50);

    assert.equal(semiCircle2.getClassName(), 'SemiCircle');
    assert.equal(semiCircle2.getWidth(), semiCircle1.getWidth());
    assert.equal(semiCircle2.getHeight(), semiCircle1.getHeight());

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,70,10);beginPath();arc(0,0,50,0,3.141,false);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,190,10);beginPath();arc(0,0,50,0,3.141,false);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();');
  });
  
  // ======================================================

  test('arrow', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var arrow1 = new Kinetic.Arrow({
        x: 10,
        y: 80,
        fill: 'yellow',
        stroke: 'red',
        strokeWidth: 4,
        height: 60,
        width: 100,
        draggable: true
    });

    var arrow2 = new Kinetic.Arrow({
        x: 280,
        y: 70,
        fill: 'blue',
        stroke: 'red',
        strokeWidth: 4,
        height: 100,
        width: 150,
        draggable: true,
        scale: {x:-1}
    });
    
    stage.add(layer);
    layer.add(arrow1);
    layer.add(arrow2);
    layer.draw();

    assert.equal(arrow1.getClassName(), 'Arrow');
    assert.equal(arrow2.getClassName(), 'Arrow');

    assert.equal(arrow1.getWidth(), 100);
    assert.equal(arrow1.getHeight(), 60);

    assert.equal(arrow2.getWidth(), 150);
    assert.equal(arrow2.getHeight(), 100);

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,10,80);beginPath();moveTo(0,0);lineTo(60,0);lineTo(60,-15);lineTo(100,15);lineTo(60,45);lineTo(60,30);lineTo(0,30);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(-1,0,0,1,280,70);beginPath();moveTo(0,0);lineTo(90,0);lineTo(90,-25);lineTo(150,25);lineTo(90,75);lineTo(90,50);lineTo(0,50);closePath();fillStyle=blue;fill();lineWidth=4;strokeStyle=red;stroke();restore();');
  });

  // ======================================================

  test('split-t', function(){
    var stage = addStage();
    var layer = new Kinetic.Layer();
    var split1 = new Kinetic.SplitT({
        x: 10,
        y: 10,
        stroke: 'red',
        strokeWidth: 4,
        height: 50,
        width: 100,
        draggable: true
    });

    var split2 = new Kinetic.SplitT({
        x: 150,
        y: 10,
        stroke: 'yellow',
        strokeWidth: 8,
        height: 100,
        width: 200,
        draggable: true
    });

    var split3 = new Kinetic.SplitT({
        x: 370,
        y: 10,
        stroke: 'blue',
        strokeWidth: 8,
        height: 50,
        width: 100,
        lineCap: 'round',
        dash: [0.001, 10],
        draggable: true
    });

    
    stage.add(layer);
    layer.add(split1);
    layer.add(split2);
    layer.add(split3);
    layer.draw();

    assert.equal(split1.getClassName(), 'SplitT');
    assert.equal(split2.getClassName(), 'SplitT');
    assert.equal(split3.getClassName(), 'SplitT');

    assert.equal(split1.height() * 2, split2.height());
    assert.equal(split1.width() * 2, split2.width());

    assert.equal(split2.strokeWidth(), split3.strokeWidth());
    assert.equal(split2.height() / 2, split3.height());
    assert.equal(split2.width() / 2, split3.width());

    assert.equal(split3.lineCap(), 'round');

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,10,10);beginPath();moveTo(0,0);lineTo(100,0);moveTo(50,0);lineTo(50,50);closePath();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,150,10);beginPath();moveTo(0,0);lineTo(200,0);moveTo(100,0);lineTo(100,100);closePath();lineWidth=8;strokeStyle=yellow;stroke();restore();save();transform(1,0,0,1,370,10);beginPath();moveTo(0,0);lineTo(100,0);moveTo(50,0);lineTo(50,50);closePath();lineCap=round;setLineDash(0.001,10);lineWidth=8;strokeStyle=blue;stroke();restore();');
  });
});