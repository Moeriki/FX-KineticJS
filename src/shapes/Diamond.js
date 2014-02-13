(function() {
    var DIAMOND = 'Diamond';

    /**
     * Diamond constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * // create diamond
     * var diamond = new Kinetic.Diamond({<br>
     *   height: 50,<br>
     *   width: 100,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Diamond = function(config) {
        this.___init(config);
    };

    Kinetic.Diamond.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = DIAMOND;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                h = this.getHeight();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(w/2, -h/2);
            context.lineTo(w, 0);
            context.lineTo(w/2, h/2);
            context.lineTo(0,0);
            context.closePath();
            context.fillStrokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Diamond, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.Diamond);
})();
