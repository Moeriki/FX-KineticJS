(function() {
    var SPEECH_BUBBLE = 'SpeechBubble';

    var BUBBLE_RATIO = 0.85; // How much space in percentage, the bubble should fill the height of the shape
    var SPEAK_LEFT = 0.35;
    var SPEAK_RIGHT = 0.20;

    /**
     * SpeechBubble constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * var speechBubble = new Kinetic.SpeechBubble({<br>
     *   width: 100,<br>
     *   height: 50, <br>
     *   stroke: 'red',<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.SpeechBubble = function(config) {
        this.___init(config);
    };

    Kinetic.SpeechBubble.prototype = {
        ___init: function(config) {
            Kinetic.Shape.call(this, config);
            this.className = SPEECH_BUBBLE;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var points, plen, i;

            points = this.constructBasicPoints();
            plen = 30;//points.length;

            context.beginPath();
            context.moveTo(points[0], points[1]);

            for (i = 2; i < plen; i = i + 4) {
                context.quadraticCurveTo(points[i], points[i + 1], points[i + 2], points[i + 3]);
            }

            context.closePath();
            context.fillStrokeShape(this);
        },
        constructBasicPoints: function() {
            var points;// = new Array(30);

            var width, height, bubbleHeight, halfWidth, halfBubbleHeight;

            // base data

            width = this.getWidth();
            height = this.getHeight();
            bubbleHeight = height * BUBBLE_RATIO;
            halfBubbleHeight = bubbleHeight / 2;
            halfWidth = width / 2;

            var revLeft, speakLeftX, speakLeftY, revRight, speakRightX, speakRightY;

            // speak angle data

            // https://stackoverflow.com/questions/5634460/quadratic-bezier-curve-calculate-point
            revRight = 1 - SPEAK_RIGHT;
            speakRightX = revRight * revRight * halfWidth;
            speakRightY = revRight * revRight * bubbleHeight + 2 * revRight * SPEAK_RIGHT * bubbleHeight + SPEAK_RIGHT * SPEAK_RIGHT * halfBubbleHeight;
            revLeft = 1 - SPEAK_LEFT;
            speakLeftX = revLeft * revLeft * halfWidth;
            speakLeftY = revLeft * revLeft * bubbleHeight + 2 * revLeft * SPEAK_LEFT * bubbleHeight + SPEAK_LEFT * SPEAK_LEFT * halfBubbleHeight;

            var /*controlRightX, controlRightY,*/ controlLeftX, controlLeftY;

            // controlRightX = (halfWidth + 3 * speakRightX) / 4;
            // controlRightY = speakRightY;//(speakRightY + 3 * halfBubbleHeight) / 4;
            controlLeftX = 0;//speakLeftX / 4;
            controlLeftY = (halfBubbleHeight + 3 * speakLeftY) / 4;

            // construct

            // base structure of array
            // [
            //   point1.x, point1.y,
            //   controlPoint1.x, controlPoint1.y,
            //   point2.x, point2.y,
            //   controlPoint2.x, controlPoint2.y,
            //   ..
            // ]

            points = [
                // left of bubble
                0, halfBubbleHeight,
                // control point top left
                0, 0,
                // top of bubble
                halfWidth, 0,
                // control point top right
                width, 0,
                // right of bubble
                width, halfBubbleHeight,
                // bottom right control point
                width, bubbleHeight,
                // bottom of bubble
                halfWidth, bubbleHeight,
                // right speaker control point
                speakRightX, bubbleHeight,
                // right speaker corner
                speakRightX, speakRightY,
                // speaker angle right corner
                speakRightX, height,
                // speaker angle
                speakLeftX - (speakRightX - speakLeftX) / 2, height,
                // speaker angle left corner
                speakLeftX, height,
                // left speaker corner
                speakLeftX, speakLeftY,
                // control point bottom left
                controlLeftX, controlLeftY,
                // back to left of bubble
                0, halfBubbleHeight
            ];

            return points;
        },
    };

    Kinetic.Util.extend(Kinetic.SpeechBubble, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.SpeechBubble);

})();
