define([,
	'kinetic',
    'lodash',
	'widgets/include/math/misc',
    'widgets/include/components/button',
    'include/code'
], function (Kinetic, $, MiscMath, Button, Code) {
    var barHeight = 44;
    var toggleWidth = 50;

    function ControlBar(widget,toggles,attrs) {
        var barWidth = toggles.length * toggleWidth;
        var partitions = MiscMath.partitionRange(-barWidth / 2, barWidth / 2, toggles.length);

        this.widget = widget;
        this._initNode();
        this._initBackground(barWidth);
        this._initSeparators(partitions);
        this._initButtons(partitions,toggles);

        this._resizeSubscription = onNodeResize.bind(c);
        PubSub.subscribe('nodeResize', this._resizeSubscription);

        return this;
    }

    ControlBar.prototype._initNode = function (attrs) {
        this.node = new Kinetic.Group(Code.mixin(attrs, {
            scaleX: 0.7 / this.widget.node.getScaleX(),
            scaleY: 0.7 / this.widget.node.getScaleY()
        }));
    }

    ControlBar.prototype._initBackground = function (barWidth) {
        this.node.add(new Kinetic.Rect({
            width: barWidth,
            height: barHeight,
            fill: '#3589b8',
            offset: [barWidth / 2, barHeight / 2]
        }));
    }

    ControlBar.prototype._initSeparators = function (partitions) {
        _(partitions.slice(1)).forEach(_(function (partition) {
            this.node.add(this._makeSeparator(r.lowerBound));
        }).bind(this));
    }

    ControlBar.prototype._initButtons = function (partitions,toggles) {
        _(toggles).forEach(_(function (toggle, i) {
            this.node.add(Button.wrapButton(toggle, toggleWidth, barHeight, {
                x: (partitions[i].lowerBound + partitions[i].upperBound) / 2
            }));
        }).bind(this));
    }

    ControlBar.prototype.dispose = function () {
        PubSub.unsubscribe(this._resizeSubscription);
    }

    ControlBar.prototype._makeSeparator = function (x) {
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

    ControlBar.prototype._onNodeResize = function (node) {
        if(node != this.widget.node)
            return;

        this.node.setScaleX(0.7 / node.getScaleX());
        this.node.setScaleY(0.7 / node.getScaleY());
    }

    return ControlBar;
});