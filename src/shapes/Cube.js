(function() {
    var CUBE = 'Cube',
        RATIO = 1/2;
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
                wr = Math.ceil(w * RATIO);
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(w, 0);
            context.lineTo(w, w);
            context.lineTo(0, w);
            context.lineTo(0, 0);
            context.lineTo(wr, -wr);
            context.lineTo(wr + w, -wr);
            context.lineTo(wr + w, -wr + w);
            context.lineTo(w, w);
            context.moveTo(w,0);
            context.lineTo(wr + w, -wr);
            context.closePath();
            context.strokeShape(this);
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
        }
    };

    Kinetic.Util.extend(Kinetic.Cube, Kinetic.Shape);
    Kinetic.Collection.mapMethods(Kinetic.Cube);

})();
