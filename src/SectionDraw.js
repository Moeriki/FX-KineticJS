(function() {
    Kinetic.Layer.prototype.addBatchDrawSection = function(section) {
        if (this.attrs.batchDrawSectionsDisabled) {
            return;
        }
        var sections = this.attrs.batchDrawSections;
        if (!sections) {
            sections = this.attrs.batchDrawSections = [];
        }
        sections.push(section);
    };
    Kinetic.Layer.prototype.disableBatchDrawSections = function () {
        this.attrs.batchDrawSectionsDisabled = true;
        delete this.attrs.batchDrawSections;
    };
    Kinetic.Layer.prototype.clearBatchDrawSections = function () {
        delete this.attrs.batchDrawSectionsDisabled;
        delete this.attrs.batchDrawSections;
    };
    Kinetic.Layer.prototype.withBatchDrawSections = function (can, top, callback) {
        try {
            var batchDrawSections = this.attrs.batchDrawSections;
            if (batchDrawSections) {
                var length = batchDrawSections.length;
                var context = can.getContext();
                for (var s = 0; s < length; s++) {
                    var section  = batchDrawSections[s];
                    var x = section.x,
                        y = section.y,
                        w = section.width,
                        h = section.height;
                    var tempCanvas = new Kinetic.SceneCanvas({
                            width: w + 2,
                            height: h + 2,
                            pixelRatio: can.getPixelRatio()
                        }),
                        tempContext = tempCanvas.getContext();
                    tempContext.save();
                    tempContext.translate(-(x - 1), -(y - 1));
                    callback.call(this, tempCanvas, top);
                    tempContext.restore();
                    context.clear({ x: x - 1, y: y - 1, width: w + 2, height: h + 2 });
                    context.drawImage(tempCanvas._canvas, x - 1, y - 1);
                }
            } else {
                callback.call(this, can, top);
            }
        } finally {
            this.clearBatchDrawSections();
        }
    };
})();
