(function() {
    'use strict';

    /* extend Kinetic.Container */

    Kinetic.Util.addMethods(Kinetic.Container, {

        insert: function(node, zIndex) {
            node.moveTo(this);
            node.setZIndex(zIndex || 0);
        },

    });

    /* extend Kinetic.Node */

    Kinetic.Util.addMethods(Kinetic.Node, {

        /**
        */
        isFirst: function() {
            return this.index === 0;
        },

        /**
        */
        isLast: function() {
            return this.index === this.parent.children.length - 1;
        },

        /**
        */
        isOrphan: function() {
            return !this.parent;
        },

        /**
        */
        moveBefore: function(node) {
            this.moveTo(node.parent);
            this.setZIndex(node.index);
        },

        /**
        */
        moveAfter: function(node) {
            this.moveTo(node.parent);
            this.setZIndex(node.index + 1);
        },

    });

})();
