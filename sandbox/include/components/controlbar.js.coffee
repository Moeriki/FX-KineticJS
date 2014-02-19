define [
	'class'
	'kinetic'
    'jquery'
	'widgets/include/math/misc'
    'widgets/include/components/button'
], (Class, Kinetic, $, MiscMath, Button) ->

    barHeight = 44
    toggleWidth = 50

    ControlBar = Class.extend
        init: (widget, toggles,attrs) ->
            @widget = widget

            barWidth = toggles.length * toggleWidth
            partitions = MiscMath.partitionRange(-barWidth / 2, barWidth / 2, toggles.length)

            @_initNode attrs
            @_initBackground barWidth
            @_initSeparators partitions
            @_initButtons toggles, partitions

            @resizeSubscription = @_onNodeResize.bind @
            PubSub.subscribe 'nodeResize', @resizeSubscription

        dispose: ->
            PubSub.unsubscribe @resizeSubscription

        _initNode: (attrs) ->
            @node = new Kinetic.Group $.extend attrs,
                scaleX: 0.7 / @widget.node.getScaleX()
                scaleY: 0.7 / @widget.node.getScaleY()

        _initBackground: (barWidth) ->
            @node.add new Kinetic.Rect
                width: barWidth
                height: barHeight
                fill: '#3589b8'
                offset: [barWidth / 2, barHeight / 2]

        _initSeparators: (partitions) ->
            @node.add @_makeSeparator r.lowerBound for r in partitions[1..]

        _initButtons: (toggles,partitions) ->
            @node.add Button.wrapButton toggle, toggleWidth, barHeight, x: (partitions[i].lowerBound + partitions[i].upperBound) / 2 for toggle, i in toggles

        _makeSeparator: (x) ->
            new Kinetic.Line
                points: [
                    x: x
                    y: -18
                ,
                    x: x
                    y: 18
                ]
                stroke: '#565656'
                strokeWidth: 1

        _onNodeResize: (node) ->
            return unless node == @widget.node

            @node.setScaleX 0.7 / node.getScaleX()
            @node.setScaleY 0.7 / node.getScaleY()

