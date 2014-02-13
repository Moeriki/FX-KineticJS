(function() {
    var TRAPEZOID = 'Trapezoid',
        RATIO = 1/4;

    /**
     * Trapezoid constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create trapezoid
     * var trapezoid = new Kinetic.Trapezoid({<br>
     *   height: 50,<br>
     *   width: 100,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Trapezoid = function(config) {
        this.___init(config);
    };

    Kinetic.Trapezoid.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = TRAPEZOID;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                h = this.getHeight();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(w, 0);
            context.lineTo(w - (RATIO*w), -h);
            context.lineTo(RATIO*w, -h);
            context.lineTo(0,0);
            context.closePath();
            context.fillStrokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Trapezoid, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.Trapezoid);
})();
