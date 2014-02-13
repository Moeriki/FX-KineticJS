(function() {
    var PARALLELOGRAM = 'Parallelogram',
        RATIO = 3/10;

    /**
     * Parallelogram constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create parallelogram
     * var parallelogram = new Kinetic.Parallelogram({<br>
     *   height: 50,<br>
     *   width: 100,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Parallelogram = function(config) {
        this.___init(config);
    };

    Kinetic.Parallelogram.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = PARALLELOGRAM;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                h = this.getHeight();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(w, 0);
            context.lineTo(w + (RATIO*w), -h);
            context.lineTo(RATIO*w, -h);
            context.lineTo(0,0);
            context.closePath();
            context.fillStrokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Parallelogram, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.Parallelogram);
})();
