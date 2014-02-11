(function() {
    var TRIANGLE_ISOSCELES = 'TriangleIsosceles';

    /**
     * TriangleIsosceles constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create isosceles triangle
     * var triangle = new Kinetic.TriangleIsosceles({<br>
     *   height: 100,<br>
     *   width: 50,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.TriangleIsosceles = function(config) {
        this.___init(config);
    };

    Kinetic.TriangleIsosceles.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = TRIANGLE_ISOSCELES;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                h = this.getHeight();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(-w / 2, h);
            context.lineTo(w / 2, h);
            context.lineTo(0, 0);
            context.closePath();
            context.fillStrokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.TriangleIsosceles, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.TriangleIsosceles);
})();
