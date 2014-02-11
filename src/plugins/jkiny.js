(function() {
    'use strict';

    /* extend Kinetic.Container */

    Kinetic.Util.addMethods(Kinetic.Container, {

        insert: function(node, zIndex) {
            node.moveTo(this);
            node.setZIndex(zIndex);
        },

    });

    /* extend Kinetic.Node */

    Kinetic.Util.addMethods(Kinetic.Node, {

        moveBefore: function(node) {
            this.moveTo(node.getParent());
            this.setZIndex(node.getZIndex());
        },

        moveAfter: function(node) {
            this.moveTo(node.getParent());
            this.setZIndex(node.getZIndex() + 1);
        },

        /**
        * Get the next node from its siblings. Returns undefined if this node is the last.
        * @method
        * @memberof Kinetic.Node.prototype
        * @returns {Kinetic.Node}
        */
        next: function() {
            return this.parent.children[this.getZIndex() + 1];
        },

        /**
        * Get the previous node from its siblings. Returns undefined if this node is the first.
        * @method
        * @memberof Kinetic.Node.prototype
        * @returns {Kinetic.Node}
        */
        previous: function() {
            return this.parent.children[this.getZIndex() - 1];
        },

        /**
        * Get all nodes that have the same parent as the current {@link Kinetic.Node}, (include the node itself.
        * @returns {[Kinetic.Node]}
        */
        siblings: function() {
            return this.parent.children;
        },

    });

})();
