(function() {
    'use strict';

    Kinetic.Util.addMethods(Kinetic.Transform, {

        transformCoords: function(x, y) {
            return {
                x: this.m[0] * x + this.m[2] * y + this.m[4],
                y: this.m[1] * x + this.m[3] * y + this.m[5]
            };
        },

        transformPoint: function(p) {
            return this.transformCoords(p.x, p.y);
        },

        dup: function() {
            var t = new Kinetic.Transform();
            t.m = this.m.slice(0);
            return t;
        }

    });

    Kinetic.Util.addMethods(Kinetic.Node, {

        // Transforms
        getAbsoluteToLocalSpaceTransform: function () {
            var tf = this.getLocalToAbsoluteSpaceTransform();
            tf.invert();
            return tf;
        },

        getLocalToAbsoluteSpaceTransform: function () {
            return this.getAbsoluteTransform().dup();
        },

        getLayerToLocalSpaceTransform: function () {
            var tf = this.getLocalToLayerSpaceTransform();
            tf.invert();
            return tf;
        },

        getLocalToLayerSpaceTransform: function () {
            var tf = this.getLayer().getAbsoluteToLocalSpaceTransform();
            tf.multiply(this.getAbsoluteTransform());
            return tf;
        },

        // Simplified tween.
        tweenTo: function (attrs) {
            if(this.tween)
                this.tween.destroy();
            attrs.node = this;
            this.tween = new Kinetic.Tween(attrs);
            this.tween.play();
        },

        listenForAttributeChanges: function (attr) {
            var node = this;
            var currentValue = node.attrs[attr];
            delete node.attrs[attr];

            Object.defineProperty(node.attrs, attr, {
                get: function () {
                    return currentValue;
                },
                set: function (newValue) {
                    currentValue = newValue;
                    node.fire('attributeChanged',attr);
                }
            });
        },

        // A bare node's bounding box can be calculated by simply using the w/h
        calculateLocalBoundingBox: function () {
            return {
                left: 0,
                top: 0,
                right: this.getWidth(),
                bottom: this.getHeight()
            };
        },

        // Calculates the bounding box in the node's parent space. 
        // This may be overridden for more complex shapes to add a more correct bounding box.
        calculateBoundingBox: function () {
            var transform = this.getTransform();
            var localBounds = this.calculateLocalBoundingBox();

            // Original bounding box is a 0x0 rectangle centered on our position
            var res = { left: this.getX(), top: this.getY(), right: this.getX(), bottom: this.getY() };

            // Make corners from the local bounds
            var localCorners = [{
                x: localBounds.left,
                y: localBounds.top
            }, {
                x: localBounds.right,
                y: localBounds.top
            }, {
                x: localBounds.right,
                y: localBounds.bottom
            }, {
                x: localBounds.left,
                y: localBounds.bottom
            }];

            // Now transform those corners from our local space into our parent's space.
            var cornersInParentSpace = localCorners.map(function (corner) {
                return transform.transformPoint(corner);
            });

            // Push the bounds of the bounding-box-up-till-now
            cornersInParentSpace.forEach(function (corner) {
                res.left   = Math.min(res.left, corner.x);
                res.top    = Math.min(res.top, corner.y);
                res.right  = Math.max(res.right, corner.x);
                res.bottom = Math.max(res.bottom, corner.y);
            });

            return res;
        }
    });

    Kinetic.Util.addMethods(Kinetic.Group, {
        calculateLocalBoundingBox: function () {
            // Start with no bounds
            var res = { left: 0, top: 0, right: 0, bottom: 0 };

            // Iterate over all children
            this.children.filter(function (child) {
                return child.getVisible();
            }).forEach(function (child) {
                // Get the child's bounding box (may recurse back into this function if the child is a group)
                var childBounds = child.calculateBoundingBox();

                // Push the bounds of the bounding-box-up-till-now
                res.left   = Math.min(res.left, childBounds.left);
                res.top    = Math.min(res.top, childBounds.top);
                res.right  = Math.max(res.right, childBounds.right);
                res.bottom = Math.max(res.bottom, childBounds.bottom);
            });

            return res;
        }
    });

})();
