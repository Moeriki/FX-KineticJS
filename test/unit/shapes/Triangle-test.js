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
        x: 100,
        y: 115,
        fill: 'blue',
        stroke: 'red',
        strokeWidth: 4,
        height: -100,
        width: 50,
        draggable: true
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

    assert.equal(triangle0.getHeight(), - triangle1.getHeight());
    assert.equal(triangle0.getWidth(), triangle1.getWidth());

    assert.equal(triangle0.getWidth(), triangle2.getWidth());
    assert.equal(triangle1.getWidth(), triangle2.getWidth());
    assert.equal(triangle0.getHeight() + 50, triangle2.getHeight());

    var trace = layer.getContext().getTrace();
    assert.equal(trace, 'clearRect(0,0,578,200);clearRect(0,0,578,200);save();transform(1,0,0,1,50,20);beginPath();moveTo(0,0);lineTo(-25,100);lineTo(25,100);lineTo(0,0);closePath();fillStyle=yellow;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,100,115);beginPath();moveTo(0,0);lineTo(-25,-100);lineTo(25,-100);lineTo(0,0);closePath();fillStyle=blue;fill();lineWidth=4;strokeStyle=red;stroke();restore();save();transform(1,0,0,1,170,20);beginPath();moveTo(0,0);lineTo(-25,150);lineTo(25,150);lineTo(0,0);closePath();fillStyle=red;fill();lineWidth=4;strokeStyle=yellow;stroke();restore();');
  });
});