(function() {
    var SPEECH_BUBBLE = 'SpeechBubble',
        // ratio used for bubble rest used for tail
        HEIGHT_RATIO = 5/8,
        HEIGHT_CURVE_RATIO = 3/4,
        // tail start position (i.e. at 1/4 of total width)
        WIDTH_RATIO = 1/4,
        // tail point position
        RATIO_BEGIN = 1/10,
        // tail back position
        RATIO_END = 3/20;
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
            var w = this.getWidth(),
                h = this.getHeight(),
                mh = h/2 * HEIGHT_RATIO;
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(0, -h/2, w/2, -h/2);
            context.quadraticCurveTo(w, -h/2, w, 0);
            context.quadraticCurveTo(w, h/2 * HEIGHT_CURVE_RATIO, WIDTH_RATIO * w, mh);
            context.lineTo(RATIO_BEGIN*w, h/2);
            context.lineTo(RATIO_END*w, mh);
            context.quadraticCurveTo(0, mh, 0, 0);
            context.closePath();
            context.strokeShape(this);
        },
    };

    Kinetic.Util.extend(Kinetic.SpeechBubble, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.SpeechBubble);

})();
