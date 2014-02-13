(function() {
    var ARROW_CLASS = 'Arrow',
        // can be changed
        HEIGHT_RATIO = 1/4,
        WIDTH_RATIO =  3/5,
        // don't change this
        HEIGHT_BODY_RATIO = 1 - (2 * HEIGHT_RATIO);

    /**
     * Arrow constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create arrow
     * var arrow = new Kinetic.Arrow({<br>
     *   height: 50,<br>
     *   width: 150,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Arrow = function(config) {
        this.___init(config);
    };

    Kinetic.Arrow.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = ARROW_CLASS;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                h = this.getHeight();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(w * WIDTH_RATIO,0);
            context.lineTo(w * WIDTH_RATIO, -h * HEIGHT_RATIO);
            context.lineTo(w, ((1 - 2 * HEIGHT_RATIO) / 2) * h);
            context.lineTo(w * WIDTH_RATIO, h * (1 - HEIGHT_RATIO));
            context.lineTo(w * WIDTH_RATIO, h * HEIGHT_BODY_RATIO);
            context.lineTo(0 * WIDTH_RATIO, h * HEIGHT_BODY_RATIO);
            context.closePath();
            context.fillStrokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Arrow, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.Arrow);
})();
