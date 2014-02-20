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

        isFirst: function() {
            return this.index === 0;
        },

        isLast: function() {
            return this.index === this.parent.children.length - 1;
        },

        isOrphan: function() {
            return !this.parent;
        },

        moveBefore: function(node) {
            this.moveTo(node.parent);
            this.setZIndex(node.index);
        },

        moveAfter: function(node) {
            this.moveTo(node.parent);
            this.setZIndex(node.index + 1);
        },

        /**
        * Get the next node from its siblings. Returns undefined if this node is the last.
        * @method
        * @memberof Kinetic.Node.prototype
        * @returns {Kinetic.Node}
        */
        next: function() {
            return this.parent.children[this.index + 1];
        },

        /**
        * Get the previous node from its siblings. Returns undefined if this node is the first.
        * @method
        * @memberof Kinetic.Node.prototype
        * @returns {Kinetic.Node}
        */
        previous: function() {
            return this.parent.children[this.index - 1];
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
