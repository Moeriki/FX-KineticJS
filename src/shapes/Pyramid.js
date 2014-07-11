(function() {
    var PYRAMID = 'Pyramid';

    var RIGHT_RATIO = 0.1,  // 0 through 1  : amount of space reserved on the X-axis for the 'depth'
        DEPTH_RATIO = 0.6,  // 0 through 1  : 'depth' of the pyramid on the Y-axis
        TOP_POINT = 0.5;  // -1 through 1 : deviation of the top point away from the center

    /**
     * Pyramid constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * var cylinder = new Kinetic.Pyramid({<br>
     *   width: 100,<br>
     *   height: 50, <br>
     *   stroke: 'red',<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Pyramid = function(config) {
        this.___init(config);
    };

    Kinetic.Pyramid.prototype = {
        ___init: function(config) {
            Kinetic.Shape.call(this, config);
            this.className = PYRAMID;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var points, plen, i;

            points = this.constructBasicPoints();
            plen = 8;//points.length;

            // paint outer lines and fill shape

            context.beginPath();
            context.moveTo(points[0], points[1]);
            for(i = 2; i < plen; i = i + 2) {
                context.lineTo(points[i], points[i + 1]);
            }
            context.closePath();
            context.fillStrokeShape(this);

            // paint single inner line (between point 0 and 2)
            context.beginPath();
            context.moveTo(points[0], points[1]);
            context.lineTo(points[4], points[5]);
            context.strokeShape(this);
        },
        /**
         * @private
         * Only contain the outer points of the pyramid so they can be reconstructed by PaperJS
         */
        constructBasicPoints: function() {
            var width, height, rightSpace;

            width = this.getWidth();
            height = this.getHeight();
            rightSpace = width * RIGHT_RATIO;

            return [
                // top point
                (width - rightSpace) * TOP_POINT, 0,
                // right 'depth' point
                width, height * DEPTH_RATIO,
                // bottom right point
                width - rightSpace,  height,
                // bottom left point
                0, height
            ];
        },
    };

    Kinetic.Util.extend(Kinetic.Pyramid, Kinetic.Shape);

    Kinetic.Collection.mapMethods(Kinetic.Pyramid);

})();
