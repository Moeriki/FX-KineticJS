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
            var w, wr, fill, shadowFill;

            w = this.getWidth();
            wr = w * this.getRatio();
            fill = this.getFill();

            if (fill) {
                // fill contour
                this._outlineCube(context, w, wr);
                context.fillShape(this);

                // fill side (shadow)
                shadowFill = Kinetic.Util.colorLuminance(fill, this.getLuminance());
                if (shadowFill) {
                    context.beginPath();
                    context.moveTo(w, 0);
                    context.lineTo(w + wr, -wr);
                    context.lineTo(w + wr, w - wr);
                    context.lineTo(w, w);
                    this._setAttr('fill', shadowFill);
                    context.fillShape(this);
                    this._setAttr('fill', fill);
                }
            }

            // stroke contour
            this._outlineCube(context, w, wr);
            context.strokeShape(this);

            // stroke middle
            context.beginPath();
            context.moveTo(w, 0); context.lineTo(0, 0);
            context.moveTo(w, 0); context.lineTo(w + wr, -wr);
            context.moveTo(w, 0); context.lineTo(w, w);
            context.strokeShape(this);
        },
        _outlineCube: function(context, w, wr) {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(wr, -wr);
            context.lineTo(w + wr, -wr);
            context.lineTo(w + wr, w - wr);
            context.lineTo(w, w);
            context.lineTo(0, w);
            context.lineTo(0, 0);
            context.closePath();
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
            var s, sr;
            s = this.getWidth();
            sr = Math.ceil(s * this.getRatio());
            return {
                left: 0,
                right: s + sr,
                top: -sr,
                bottom: s,
            };
        },
    };

    Kinetic.Util.extend(Kinetic.Cube, Kinetic.Shape);

    // add getters setters
    Kinetic.Factory.addGetterSetter(Kinetic.Cube, 'ratio', 0.35);
    Kinetic.Factory.addGetterSetter(Kinetic.Cube, 'luminance', -0.2);

    Kinetic.Collection.mapMethods(Kinetic.Cube);

})();
