(function() {
    var CYLINDER = 'Cylinder';

    var RATIO = 0.12;

    /**
     * Cylinder constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * var cylinder = new Kinetic.Cylinder({<br>
     *   width: 100,<br>
     *   height: 50, <br>
     *   stroke: 'red',<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Cylinder = function(config) {
        this.___init(config);
    };

    Kinetic.Cylinder.prototype = {
        ___init: function(config) {
            Kinetic.Shape.call(this, config);
            this.className = CYLINDER;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var width, halveWidth, height, heightHalveCurve, heightCurve;

            width = this.getWidth();
            halveWidth = width / 2;
            height = this.getHeight();
            heightHalveCurve = height * RATIO;
            heightCurve = heightHalveCurve * 2;

            context.beginPath();

            context.moveTo(0, heightHalveCurve);

            // top curve
            context.quadraticCurveTo(0, 0, halveWidth, 0);
            context.quadraticCurveTo(width, 0, width, heightHalveCurve);
            // context.quadraticCurveTo(halveWidth, -heightHalveCurve, width, heightHalveCurve);

            // right line
            context.lineTo(width, height - heightHalveCurve);

            // bottom curve
            context.quadraticCurveTo(width, height, halveWidth, height);
            context.quadraticCurveTo(0, height, 0, height - heightHalveCurve);
            // context.quadraticCurveTo(halveWidth, height + heightHalveCurve, 0, height - heightHalveCurve);

            context.closePath();
            context.fillStrokeShape(this);

            context.beginPath();

            context.moveTo(0, heightHalveCurve);
            context.quadraticCurveTo(0, heightCurve, halveWidth, heightCurve);
            context.quadraticCurveTo(width, heightCurve, width, heightHalveCurve);

            context.strokeShape(this);
        },
    };

    Kinetic.Util.extend(Kinetic.Cylinder, Kinetic.Shape);

    Kinetic.Collection.mapMethods(Kinetic.Cylinder);

})();
