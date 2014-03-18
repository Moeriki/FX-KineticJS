define(function () {
	return {
	    changeNode: function (node, to) {
	//        node.tweenTo(Code.mixin(to, {
	//            easing: Kinetic.Easings.EaseOut,
	//            duration: 0.5
	//        }));
	        node.setAttrs(to);
	        node.getLayer().batchDraw();
	    }

	}
});
