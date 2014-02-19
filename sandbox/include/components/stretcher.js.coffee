define [
	'class'
	'kinetic'
    'widgets/include/events'
    'widgets/include/patterns/observer'
    'widgets/include/propertyadapter'
    'widgets/include/math/misc'
    'whiteboard'
], (Class, Kinetic, Events, Observer, PropertyAdapter, MiscMath, Whiteboard) ->

    # Interface Stretchable:
    #  - property height: set
    #      Sets the height of the control.

    StandardStretcherStyle =
        makeHandle: ->
            new Kinetic.Image
                image: greyArrowImg
                width: 25
                height: 15
                offset: [12.5, 7.5]
                scale: 0.75

        height2HandlePos: (h) ->
            -h - 50

        handlePos2Height: (y) ->
            -y - 50


    Stretcher = Class.extend
        init: (widget, stretchables, style, minHeight = 0, maxHeight = Infinity, attrs) ->
            @widget = widget
            @stretchables = stretchables
            @style = style
            @initSubject()
            @__height = 0
            @minHeight = minHeight
            @maxHeight = maxHeight
            @registerObserver @update.bind @
            @initNode(attrs)
            @initDragHandle()

        placed: (height) ->
            @height = height

        initNode: (attrs) ->
            @node = new Kinetic.Group attrs

        initDragHandle: ->
            @drag = @style.makeHandle()
            @drag.setPosition
                x: 0
                y: @style.height2HandlePos @__height
            @drag.addClass 'button'

            @drag.on 'pointdown', =>
                @widget.beginManipulation()
                Events.hookStageMovement @onDrag.bind(@), @widget.endManipulation.bind(@widget)

            @node.add @drag

        onDrag: (e) ->
            localMouse = @node.getAbsoluteToLocalSpaceTransform().transformPoint Whiteboard.stage.getPointerPosition()
            @height = MiscMath.clamp @style.handlePos2Height(localMouse.y), @minHeight, @maxHeight

        update: ->
            @drag.setPosition
                x: 0
                y: @style.height2HandlePos @__height
            @node.getLayer().batchDraw()

    Object.defineProperty Stretcher::, '_height',
        set: (h) ->
            @__height = h
            stretchable.height = h for stretchable in @stretchables

    Observer.mixinSubject Stretcher::
    Observer.defineNotifyingProperty Stretcher::, 'height'


    # Implements Stretchable
    StretchAdapter = PropertyAdapter.PropertyAdapter.extend
        init: (tgt, attr) ->
            @_super tgt,
                height:
                    name: attr
                    type: PropertyAdapter.AccessType.SET

    Stretcher: Stretcher
    StretchAdapter: StretchAdapter
