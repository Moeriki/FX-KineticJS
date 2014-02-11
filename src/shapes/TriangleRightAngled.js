(function() {
    var TRIANGLE_RIGHT_ANGLED = 'TriangleRightAngled';

    /**
     * TriangleRightAngled constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create right-angled triangle
     * var triangle = new Kinetic.TriangleRightAngled({<br>
     *   height: 50,<br>
     *   width: 100,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.TriangleRightAngled = function(config) {
        this.___init(config);
    };

    Kinetic.TriangleRightAngled.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = TRIANGLE_RIGHT_ANGLED;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                h = this.getHeight();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, h);
            context.lineTo(w, h);
            context.lineTo(0, 0);
            context.closePath();
            context.fillStrokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.TriangleRightAngled, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.TriangleRightAngled);
})();
