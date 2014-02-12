(function() {
    var SQUARE = 'Square';
    /**
     * Square constructor
     * @constructor
     * @memberof Kinetic
     * @augments Kinetic.Rect
     * @param {Object} config
     * @@shapeParams
     * @@nodeParams
     * @example
     * var square = new Kinetic.Square({<br>
     *   width: 100,<br>
     *   fill: 'red',<br>
     *   stroke: 'black'<br>
     *   strokeWidth: 5<br>
     * });
     */
    Kinetic.Square = function(config) {
        this.___init(config);
    };

    Kinetic.Square.prototype = {
        ___init: function(config) {
            Kinetic.Shape.call(this, config);
            this.className = SQUARE;
            this.sceneFunc(this._sceneFunc);
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

    Kinetic.Util.extend(Kinetic.Square, Kinetic.Rect);
    Kinetic.Collection.mapMethods(Kinetic.Square);
})();
