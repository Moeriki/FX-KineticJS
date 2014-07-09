(function() {
    var SPLIT_T = 'SplitT';

    /**
     * SplitT constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create split-t
     * var splitT = new Kinetic.SplitT({<br>
     *   height: 50,<br>
     *   width: 100,<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.SplitT = function(config) {
        this.___init(config);
    };

    Kinetic.SplitT.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = SPLIT_T;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                h = this.getHeight();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(w, 0);
            context.moveTo(w / 2, 0);
            context.lineTo(w / 2, h);
            context.strokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.SplitT, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.SplitT);
})();
