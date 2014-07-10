(function() {
    var CUBE = 'Cube';

    /**
     * Cube constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Shape
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * var cube = new Kinetic.Cube({<br>
     *   width: 100,<br>
     *   stroke: 'red'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Cube = function(config) {
        this.___init(config);
    };

    Kinetic.Cube.prototype = {
        ___init: function(config) {
            Kinetic.Shape.call(this, config);
            this.className = CUBE;
            this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function(context) {
            var w = this.getWidth(),
                wr = Math.ceil(w * this.getRatio());

            context.beginPath();

            context.moveTo(w, 0); context.lineTo(0, 0);
            context.moveTo(w, 0); context.lineTo(w + wr, -wr);
            context.moveTo(w, 0); context.lineTo(w, w);

            context.moveTo(0, 0);
            context.lineTo(wr, -wr);
            context.lineTo(w + wr, -wr);
            context.lineTo(w + wr, w - wr);
            context.lineTo(w, w);
            context.lineTo(0, w);
            context.lineTo(0, 0);
            context.closePath();

            context.fillStrokeShape(this);
        },
        // implements Shape.prototype.setWidth()
        setWidth: function(width) {
            Kinetic.Node.prototype.setWidth.call(this, width);
            this._setAttr('height', width);
        },
        // implements Shape.prototype.setHeight()
        setHeight: function(height) {
            Kinetic.Node.prototype.setHeight.call(this, height);
            this._setAttr('width', height);
        },
        calculateLocalBoundingBox: function() {
            var s, sr, halfStroke;

            s = this.getWidth();
            sr = Math.ceil(s * this.getRatio());
            halfStroke = this.getStrokeWidth() / 2;

            return {
                left: -halfStroke,
                right: s + sr + halfStroke,
                top: -sr - halfStroke,
                bottom: s + halfStroke,
            };
        },
    };

    Kinetic.Util.extend(Kinetic.Cube, Kinetic.Shape);

    // add getters setters
    Kinetic.Factory.addGetterSetter(Kinetic.Cube, 'ratio', 0.5);

    Kinetic.Collection.mapMethods(Kinetic.Cube);

})();
