(function() {
    var TRIANGLE_EQUILATERAL = 'TriangleEquilateral',
        RATIO = Math.sqrt(3)/2;

    /**
     * TriangleEquilateral constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @param {Number} config.side
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create equilateral triangle
     * var triangle = new Kinetic.TriangleEquilateral({<br>
     *   height: 100,<br>
     *   width: 50,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.TriangleEquilateral = function(config) {
        this.___init(config);
    };

    Kinetic.TriangleEquilateral.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = TRIANGLE_EQUILATERAL;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getSide(),
                h = w * RATIO;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(-w / 2, h);
            context.lineTo(w / 2, h);
            context.lineTo(0, 0);
            context.closePath();
            context.fillStrokeShape(this);
        },
        // implements Shape.prototype.getWidth()
        getWidth: function() {
            return this.getSide();
        },
        // implements Shape.prototype.getHeight()
        getHeight: function() {
            return this.getSide() * RATIO;
        },
        // implements Shape.prototype.setWidth()
        setWidth: function(width) {
            Kinetic.Node.prototype.setWidth.call(this, width);
            this.setSide(width);
        },
        // implements Shape.prototype.setHeight()
        setHeight: function(height) {
            Kinetic.Node.prototype.setHeight.call(this, height);
            this.setSide(height / RATIO);
        }
    };
    Kinetic.Util.extend(Kinetic.TriangleEquilateral, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.TriangleEquilateral);

    // add getters setters
    Kinetic.Factory.addGetterSetter(Kinetic.TriangleEquilateral, 'side', 0);

    /**
     * get/set side size
     * @name side
     * @method
     * @memberof Kinetic.TriangleEquilateral.prototype
     * @param {Number} side
     * @returns {Number}
     * @example
     * // get side<br>
     * var sideSize = triangle.side();<br><br>
     *
     * // set side<br>
     * triangle.side(30);<br>
     */
})();
