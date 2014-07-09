(function() {
    // the 0.0001 offset fixes a bug in Chrome 27
    var PI = Math.PI - 0.0001,
        SEMI_CIRCLE = 'SemiCircle';
    /**
     * SemiCircle constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Circle
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * var semiCircle = new Kinetic.SemiCircle({<br>
     *   radius: 50,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.SemiCircle = function(config) {
        this.___init(config);
    };

    Kinetic.SemiCircle.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = SEMI_CIRCLE;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            context.beginPath();
            context.arc(0, 0, this.getRadius(), 0, PI, false);
            context.closePath();
            context.fillStrokeShape(this);
        },
        // implements Shape.prototype.getWidth()
        getWidth: function() {
            return this.getRadius() * 2;
        },
        // implements Shape.prototype.setWidth()
        setWidth: function(width) {
            Kinetic.Node.prototype.setWidth.call(this, width);
            this.setRadius(width / 2);
        },
        // implements Shape.prototype.getHeight()
        getHeight: function() {
            return this.getRadius();
        },
        // implements Shape.prototype.setHeight()
        setHeight: function(height) {
            Kinetic.Node.prototype.setHeight.call(this, height);
            this.setRadius(height);
        }
    };

    Kinetic.Util.extend(Kinetic.SemiCircle, Kinetic.Circle);
    Kinetic.Collection.mapMethods(Kinetic.SemiCircle);
})();
