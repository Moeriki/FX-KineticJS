(function() {
    var BATCH_DRAW_STOP_TIME_DIFF = 500;

    var now =(function() {
        if (Kinetic.root.performance && Kinetic.root.performance.now) {
            return function() {
                return Kinetic.root.performance.now();
            };
        }
        else {
            return function() {
                return new Date().getTime();
            };
        }
    })();

    var RAF = (function() {
        return Kinetic.root.requestAnimationFrame
            || Kinetic.root.webkitRequestAnimationFrame
            || Kinetic.root.mozRequestAnimationFrame
            || Kinetic.root.oRequestAnimationFrame
            || Kinetic.root.msRequestAnimationFrame
            || FRAF;
    })();

    function FRAF(callback) {
        Kinetic.root.setTimeout(callback, 1000 / 60);
    }

    function requestAnimFrame() {
        return RAF.apply(Kinetic.root, arguments);
    }

    /**
     * Animation constructor.  A stage is used to contain multiple layers and handle
     * @constructor
     * @memberof Kinetic
     * @param {Function} func function executed on each animation frame.  The function is passed a frame object, which contains
     *  timeDiff, lastTime, time, and frameRate properties.  The timeDiff property is the number of milliseconds that have passed
     *  since the last animation frame.  The lastTime property is time in milliseconds that elapsed from the moment the animation started
     *  to the last animation frame.  The time property is the time in milliseconds that ellapsed from the moment the animation started
     *  to the current animation frame.  The frameRate property is the current frame rate in frames / second
     * @param {Kinetic.Layer|Array} [layers] layer(s) to be redrawn on each animation frame. Can be a layer, an array of layers, or null.
     * @param {boolean} [isPartial] Indicates that the the animation wants to perform a partial update. func is passed an extra boolean
     *  indicates that the specified layers will be updated, and if true func can choose not to do the partial update because it will have
     *  been done by drawing the layers.
     *  Not specifying a node will result in no redraw.
     * @example
     * // move a node to the right at 50 pixels / second<br>
     * var velocity = 50;<br><br>
     *
     * var anim = new Kinetic.Animation(function(frame) {<br>
     *   var dist = velocity * (frame.timeDiff / 1000);<br>
     *   node.move(dist, 0);<br>
     * }, layer);<br><br>
     *
     * anim.start();
     */
    Kinetic.Animation = function(func, layers, isPartial) {
        var Anim = Kinetic.Animation;
        this.func = func;
        this.setLayers(layers);
        this.isPartial = isPartial;
        this.id = Anim.animIdCounter++;
        this.frame = {
            time: 0,
            timeDiff: 0,
            lastTime: now()
        };
    };
    /*
     * Animation methods
     */
    Kinetic.Animation.prototype = {
        /**
         * set layers to be redrawn on each animation frame
         * @method
         * @memberof Kinetic.Animation.prototype
         * @param {Kinetic.Layer|Array} [layers] layer(s) to be redrawn.&nbsp; Can be a layer, an array of layers, or null.  Not specifying a node will result in no redraw.
         */
        setLayers: function(layers) {
            var lays = [];
            // if passing in no layers
            if (!layers) {
                lays = [];
            }
            // if passing in an array of Layers
            // NOTE: layers could be an array or Kinetic.Collection.  for simplicity, I'm just inspecting
            // the length property to check for both cases
            else if (layers.length > 0) {
                lays = layers;
            }
            // if passing in a Layer
            else {
                lays = [layers];
            }

            this.layers = lays;
        },
        /**
         * get layers
         * @method
         * @memberof Kinetic.Animation.prototype
         */
        getLayers: function() {
            return this.layers;
        },
        /**
         * add layer.  Returns true if the layer was added, and false if it was not
         * @method
         * @memberof Kinetic.Animation.prototype
         * @param {Kinetic.Layer} layer
         */
        addLayer: function(layer) {
            var layers = this.layers,
                len, n;

            if (layers) {
                len = layers.length;

                // don't add the layer if it already exists
                for (n = 0; n < len; n++) {
                    if (layers[n]._id === layer._id) {
                        return false;
                    }
                }
            }
            else {
                this.layers = [];
            }

            this.layers.push(layer);
            return true;
        },
        /**
         * determine if animation is running or not.  returns true or false
         * @method
         * @memberof Kinetic.Animation.prototype
         */
        isRunning: function() {
            var a = Kinetic.Animation,
                animations = a.animations,
                len = animations.length,
                n;

            for(n = 0; n < len; n++) {
                if(animations[n].id === this.id) {
                    return true;
                }
            }
            return false;
        },
        /**
         * start animation
         * @method
         * @memberof Kinetic.Animation.prototype
         */
        start: function() {
            var Anim = Kinetic.Animation;
            this.stop();
            this.frame.timeDiff = 0;
            this.frame.lastTime = now();
            this.enable();
            Anim._addAnimation(this);
        },
        /**
         * stop animation
         * @method
         * @memberof Kinetic.Animation.prototype
         */
        stop: function() {
            Kinetic.Animation._removeAnimation(this);
        },
        /**
         * Temporarily disables animation. disable() incurs less overhead than stop(),
         * but a disabled animation still uses some CPU time when the animation is
         * rendered. Good alternative for when start and stop are called frequently
         * for a few animations.
         * @method
         * @memberof Kinetic.Animation.prototype
         */
        disable: function () {
            this._disabled = true;
        },
        /**
         * Reenables animation.
         * @method
         * @memberof Kinetic.Animation.prototype
         */
        enable: function () {
            this._disabled = false;
        },
        _updateFrameObject: function(time) {
            this.frame.timeDiff = time - this.frame.lastTime;
            this.frame.lastTime = time;
            this.frame.time += this.frame.timeDiff;
            this.frame.frameRate = 1000 / this.frame.timeDiff;
        }
    };
    Kinetic.Animation.animations = [];
    Kinetic.Animation.animIdCounter = 0;
    Kinetic.Animation.animRunning = false;

    Kinetic.Animation._addAnimation = function(anim) {
        this.animations.push(anim);
        this._handleAnimation();
    };
    Kinetic.Animation._removeAnimation = function(anim) {
        var id = anim.id,
            animations = this.animations,
            len = animations.length,
            n;

        for(n = 0; n < len; n++) {
            if(animations[n].id === id) {
                this.animations.splice(n, 1);
                break;
            }
        }
    };

    Kinetic.Animation._runFrames = function() {
        var layerHash = {},
            animations = this.animations,
            anim, animLen, layers, func, n, i, layersLen, layer, key, allLayersDrawn;

        for(n = 0, animLen = animations.length; n < animLen; n++) {
            anim = animations[n];
            if (!anim._disabled && !anim.isPartial) {
                layers = anim.layers;
                layersLen = layers.length;

                for (i=0; i<layersLen; i++) {
                    layer = layers[i];
                    if(layer._id !== undefined) {
                        layerHash[layer._id] = layer;
                    }
                }
            }
        }
        /*
         * loop through all animations and execute animation
         *  function.  if the animation object has specified node,
         *  we can add the node to the nodes hash to eliminate
         *  drawing the same node multiple times.  The node property
         *  can be the stage itself or a layer
         */
        /*
         * WARNING: don't cache animations.length because it could change while
         * the for loop is running, causing a JS error
         */
        for(n = 0; n < animations.length; n++) {
            anim = animations[n];
            if (!anim._disabled) {
                layers = anim.layers;
                func = anim.func;

                anim._updateFrameObject(now());
                layersLen = layers.length;

                if (anim.isPartial) {
                    allLayersDrawn = true;
                    for (i=0; i<layersLen; i++) {
                        layer = layers[i];
                        if(layer._id !== undefined && !layerHash[layer._id]) {
                            allLayersDrawn = false;
                            break;
                        }
                    }
                }

                // if animation object has a function, execute it
                if(func) {
                    func.call(anim, anim.frame, allLayersDrawn);
                }
            }
        }

        for(key in layerHash) {
            layerHash[key].draw();
        }
    };
    Kinetic.Animation._animationLoop = function() {
        var Anim = Kinetic.Animation;

        if(Anim.animations.length) {
            requestAnimFrame(Anim._animationLoop);
            Anim._runFrames();
        }
        else {
            Anim.animRunning = false;
        }
    };
    Kinetic.Animation._handleAnimation = function() {
        var that = this;
        if(!this.animRunning) {
            this.animRunning = true;
            that._animationLoop();
        }
    };

    var moveTo = Kinetic.Node.prototype.moveTo;
    Kinetic.Node.prototype.moveTo = function(container) {
        moveTo.call(this, container);
    };

    /**
     * batch draw
     * @method
     * @memberof Kinetic.Layer.prototype
     */
    Kinetic.Layer.prototype.batchDraw = function(shape) {
        var that = this,
            Anim = Kinetic.Animation;

        this.batchShapes = [];
        this.batchAll = false;
        if (shape) {
            this.batchShapes.push(shape);
        } else {
            this.batchAll = true;
        }
        if (!this.batchAnim) {
            this.batchAnim = new Anim(function(_, layerDrawn) {
                if (that.lastBatchDrawTime && now() - that.lastBatchDrawTime > BATCH_DRAW_STOP_TIME_DIFF) {
                    that.batchAnim.stop();
                } else {
                    that.batchAnim.disable();
                }
                if (!layerDrawn) {
                    if (that.batchAll) {
                        that.draw();
                    } else if (that.batchShapes.length > 0) {
                        for (var bs = 0, bsLen = that.batchShapes.length; bs < bsLen; bs++) {
                            that.batchShapes[bs].draw();
                        }
                    }
                }
                this.batchShapes = [];
                this.batchAll = false;
            }, this, true);
        }

        this.lastBatchDrawTime = now();

        if (!this.batchAnim.isRunning()) {
            // NOTE: This draw serves no purpose in my opinion. Let's say batchDraw is called twice in a row,
            //       the second time after some updates. These updates won't be drawn right away. ~Peter
            this.draw();
            this.batchAnim.start();
        } else {
            that.batchAnim.enable();
        }
    };

    /**
     * batch draw
     * @method
     * @memberof Kinetic.Stage.prototype
     */
    Kinetic.Stage.prototype.batchDraw = function(shape) {
        this.getChildren().each(function(layer) {
            layer.batchDraw(shape);
        });
    };

})((1,eval)('this'));
