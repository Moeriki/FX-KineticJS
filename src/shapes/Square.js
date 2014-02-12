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
            if(this.lockRatio()){this._setAttr('height', width);}
        },
        // implements Shape.prototype.setHeight()
        setHeight: function(height) {
            Kinetic.Node.prototype.setHeight.call(this, height);
            if(this.lockRatio()){this._setAttr('width', height);}
        }
    };

    Kinetic.Util.extend(Kinetic.Square, Kinetic.Rect);
    Kinetic.Collection.mapMethods(Kinetic.Square);

    // add getters setters
    Kinetic.Factory.addGetterSetter(Kinetic.Square, 'lockRatio', true);

    /**
     * get/set ratio lock, ensures that sides square stays equal
     * @name lockRatio
     * @method
     * @memberof Kinetic.TriangleEquilateral.prototype
     * @param {Boolean} lockRatio
     * @returns {Boolean}
     * @example
     * // get ratio lock<br>
     * var lock = square.lockRatio();<br><br>
     *
     * // set ratio lock<br>
     * square.lockRatio(false);<br>
     */
})();
