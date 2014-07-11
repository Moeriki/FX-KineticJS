(function() {
    var ARROW_CLASS = 'Arrow';

    var PI, cos, sin;

    PI = Math.PI;
    cos = Math.cos;
    sin = Math.sin;

    function angleFromTo(centerX, centerY, pointX, pointY) {
        return Math.atan2(pointY - centerY, pointX - centerX);
    }

    /**
     * Arrow constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Line
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

    Kinetic.Arrow.STYLE_BARE = 0;
    Kinetic.Arrow.STYLE_HOLLOW = 1;//TODO hollow doesn't work as intended yet, but we don't use it yet so wuteva ~DL
    Kinetic.Arrow.STYLE_FILLED = 2;

    Kinetic.Arrow.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = ARROW_CLASS;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            Kinetic.Line.prototype._sceneFunc.call(this, context);

            var points, plen, style, angle, lineAngle;

            points = this.getPoints();
            plen = points.length;
            style = this.getArrowStyle();
            angle = this.getArrowAngle();

            if (plen < 4) {
                return;
            }

            //TODO adapt line angle to tension ~DL
            lineAngle = angleFromTo(points[plen - 4], points[plen - 3], points[plen - 2], points[plen - 1]);

            var size, angle1, angle2, arrowTopX, arrowTopY, arrowPoint1X, arrowPoint1Y, arrowPoint2X, arrowPoint2Y;

            size = 25;
            angle1 = lineAngle + PI + angle;
            angle2 = lineAngle + PI - angle;

            arrowTopX = points[plen - 2];
            arrowTopY = points[plen - 1];

            // cover the top of the line when we're using fill to cover up the fact that we don't draw a border
            if (style === Kinetic.Arrow.STYLE_FILLED) {
                arrowTopX += cos(lineAngle) * this.getStrokeWidth();
                arrowTopY += sin(lineAngle) * this.getStrokeWidth();
            }

            arrowPoint1X = arrowTopX + cos(angle1) * size;
            arrowPoint1Y = arrowTopY + sin(angle1) * size;
            arrowPoint2X = arrowTopX + cos(angle2) * size;
            arrowPoint2Y = arrowTopY + sin(angle2) * size;

            context.beginPath();
            context.moveTo(arrowPoint1X, arrowPoint1Y);
            context.lineTo(arrowTopX, arrowTopY);
            context.lineTo(arrowPoint2X, arrowPoint2Y);

            if (style !== Kinetic.Arrow.STYLE_BARE) {
                context.closePath();
            }

            if (style === Kinetic.Arrow.STYLE_FILLED) {
                context.fillShape(this);
            } else {
                context.strokeShape(this);
            }
        }
    };

    Kinetic.Util.extend(Kinetic.Arrow, Kinetic.Line);

    // add getters setters
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, 'arrowAngle', Math.PI / 4);
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, 'arrowStyle', Kinetic.Arrow.STYLE_FILLED);

    Kinetic.Collection.mapMethods(Kinetic.Arrow);
})();
