(function() {
    'use strict';

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
        }

    });

})();
