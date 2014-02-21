define([,
	'kinetic',
    'lodash',
	'widgets/include/math/misc',
    'widgets/include/components/button'
], function (Kinetic, $, MiscMath, Button) {
    var barHeight = 44;
    var toggleWidth = 50;

    function createControlBar(widget, toggles, attrs) {
        var barWidth = toggles.length * toggleWidth;
        var partitions = MiscMath.partitionRange(-barWidth / 2, barWidth / 2, toggles.length);
        var resizeSubscription;
        var node = new Kinetic.Group(_.mixin(attrs, {
            scaleX: 0.7 / widget.node.getScaleX(),
            scaleY: 0.7 / widget.node.getScaleY()
        }));

        function init() {
            initBackground();
            initSeparators();
            initButtons();

            resizeSubscription = onNodeResize;
            PubSub.subscribe('nodeResize', resizeSubscription);
        }

        function initBackground() {
            node.add(new Kinetic.Rect({
                width: barWidth,
                height: barHeight,
                fill: '#3589b8',
                offset: [barWidth / 2, barHeight / 2]
            }));
        }

        function initSeparators() {
            _(partitions.slice(1)).forEach(function (partition) {
                node.add(makeSeparator(r.lowerBound));
            });
        }

        function initButtons() {
            _(toggles).forEach(function (toggle, i) {
                node.add(Button.wrapButton(toggle, toggleWidth, barHeight, {
                    x: (partitions[i].lowerBound + partitions[i].upperBound) / 2
                }));
            });
        }

        function dispose() {
            PubSub.unsubscribe(resizeSubscription);
        }

        function makeSeparator(x) {
            return new Kinetic.Line({
                points: [{
                    x: x,
                    y: -18
                }, {
                    x: x,
                    y: 18
                }],
                stroke: '#565656',
                strokeWidth: 1
            });
        }

        function onNodeResize(otherNode) {
            if(otherNode != widget.node)
                return;

            node.setScaleX(0.7 / otherNode.getScaleX());
            node.setScaleY(0.7 / otherNode.getScaleY());
        }

        init();

        return {
            dispose: dispose,
            get node() { return node; }
        };
    }

    return {
        create: createControlBar
    };
});