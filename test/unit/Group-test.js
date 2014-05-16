suite('Group', function() {

  // ======================================================
  test('cache group with text', function() {
    var stage = addStage();

    var layer = new Kinetic.Layer();
    var group = new Kinetic.Group({
        draggable : true,
        x: 100,
        y: 40
    });
    var text = new Kinetic.Text({
        text : "some text",
        fontSize: 20,
        fill: "black",
        y : 50
    });

    var rect = new Kinetic.Rect({
        height : 100,
        width : 100,
        stroke : "#00B80C",
        strokeWidth: 10,
        cornerRadius: 1
    });
    group.add(text);
    group.add(rect);
    layer.add(group);

    stage.add(layer);

    group.cache({
      x: -5,
      y: -5,
      width : 110,
      height : 110,
      drawBorder: true
    }).offsetX(5).offsetY(5);

    stage.draw();
  });
  test('#calculateBoundingBox group with clipping', function () {
        var rect = new Kinetic.Rect({
            width: 50,
            height: 50,
            offset: {
                x: 25,
                y: 25
            },
            x: -30
        });
        var rect2 = new Kinetic.Rect({
            width: 20,
            height: 80,
            y: 70,
            scale: {
                x: 0.5,
                y: 0.5
            }
        });

        var group = new Kinetic.Group({
          clip: {
            x: -30,
            y: -10,
            width: 35,
            height: 50
          }
        });
        group.add(rect);
        group.add(rect2);

        var bounds = group.calculateBoundingBox();
        assert.equal(bounds.left,  -30);
        assert.equal(bounds.top, -10);
        assert.equal(bounds.right, 5);
        assert.equal(bounds.bottom, 40);
  });
  test('#calculateBoundingBox group with clipping to empty space', function () {
        var rect = new Kinetic.Rect({
            width: 50,
            height: 50,
            offset: {
                x: 25,
                y: 25
            },
            x: -30
        });
        var rect2 = new Kinetic.Rect({
            width: 20,
            height: 80,
            y: 70,
            scale: {
                x: 0.5,
                y: 0.5
            }
        });

        var group = new Kinetic.Group({
          clip: {
            x: 200,
            y: 240,
            width: 35,
            height: 50
          }
        });
        group.add(rect);
        group.add(rect2);

        var bounds = group.calculateBoundingBox();
        assert.equal(bounds, null);
  });
});







