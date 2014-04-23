(function() {
    var BATCH_DRAW_STOP_TIME_DIFF = 500;

    var workQueue = [],
        anim;

    function drawWorkNodes() {
         // Process our work queue.
        workQueue.forEach(function (node) {
            node.draw();
        });
    }

    function workLoop(frame) {
        if (frame.timeDiff > BATCH_DRAW_STOP_TIME_DIFF) {
            anim.stop();
        } else {
            anim.disable();
        }

        drawWorkNodes();
        workQueue = [];
    }
    anim = new Kinetic.Animation(workLoop);

    function isWorkAlreadyQueued(node) {
        // Check all items in the work queue
        return workQueue.some(function (queuedNode) {
                // Check if the node is already in the work queue.
            return node === queuedNode
                // Otherwise, check the groups in the work queue to see if one of the node's
                // ancestors isn't already being drawn, as this would also automatically
                // draw this node.
                || queuedNode.isAncestorOf && queuedNode.isAncestorOf(node);
        });
    }

    function maybePushWorkToQueue(node) {
        // First check if the node will already be redrawn
        if(isWorkAlreadyQueued(node)) {
            return;
        }

        // If we are adding a container, we want to drop work that's handled by
        // this node.
        if(node.isAncestorOf) {
            workQueue = workQueue.filter(function (queuedNode) {
                return !node.isAncestorOf(queuedNode);
            });
        }

        // Now push the new node
        workQueue.push(node);
    }

    function addWork(node) {
        maybePushWorkToQueue(node);
        if(!anim.isRunning()) {
            anim.start();
        } else {
            anim.enable();
        }
    }

    Kinetic.Stage.prototype.batchDraw = function() {
        this.getChildren().each(function(layer) {
            layer.batchDraw();
        });
    };

    Kinetic.Node.prototype.batchDraw = function() {
        addWork(this);
    };
})();
