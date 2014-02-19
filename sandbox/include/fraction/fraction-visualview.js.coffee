###
 @author: Ruben Tytgat

 Implements an animated graphical view of a fraction. Must be subclassed to define
 the Kinetic objects and placement/tween formulas.
###

define [
    'widgets/widget-base'
    'kinetic'
    'class'
], (WidgetBase,Kinetic,Class) ->

    Visual: Class.extend
        init: (widget, pos) ->
            @widget = widget
            @initNode(pos)
            @initBackground()
            @initVisual()
            @initRuler()
            @initEvents()

        initNode: (pos) ->
            @node = new Kinetic.Group
                x: pos.x
                y: pos.y

        initBackground: ->
            @background = @makeBackground()
            @node.add @background

        initVisual: ->
            @visual = @makeVisual()
            @node.add @visual

        initRuler: ->
            @ruler = new Kinetic.Group
            @node.add @ruler
            @setRuler()

        initEvents: ->
            @node.on 'tap', @onDrag.bind @
            # FIXME: Change on drag?
            #@node.on 'pointmove', @onDrag.bind @


        setTo: (v) ->
            style = @getVisualTweenStyle(v)
            style.node = @visual
            style.duration = 0.5
            style.easing = Kinetic.Easings.EaseOut
            @visual.tween.destroy() if @visual.tween?
            @visual.tween = new Kinetic.Tween style
            @visual.tween.play()
            @setRuler()

        setRuler: ->
            @ruler.destroyChildren()
            @drawRuler()

        onDrag: (e) ->
            pp = @node.getStage().getPointerPosition()
            worldMouse = @node.getAbsoluteToLocalSpaceTransform().transformCoords(pp.x, pp.y);
            part = @mouseToPart(worldMouse)
            @widget.onDrag(@, part)




    VisualView: WidgetBase.extend
        init: (toolID, frac, attrs) ->
            @_super toolID, attrs
            @initPreDraw()
            @frac = frac
            @initVisuals()
            @frac.registerObserver @update.bind @

        placed: ->
            @update()

        initPreDraw: ->
            # For subclasses to init things like assets

        initVisuals: ->
            @visuals = []
            @addVisual(x: 0, y: 0)

        update: ->
            @updateVisuals @frac.wholes, @frac.remainder

        visualsRequired: (intpart, rem) ->
            intpart + (if rem == 0 and intpart != 0 then 0 else 1)

        removeVisual: ->
            @visuals.pop().node.destroy()

        addVisual: (pos) ->
            visual = @makeVisual(pos)
            @visuals.push visual
            @node.add visual.node

        updateVisuals: (intpart, rem) ->
            visualsRequired = @visualsRequired(intpart, rem)
            @removeVisual() until @visuals.length <= visualsRequired

            lastVisualPos = @visuals[@visuals.length - 1].node.getPosition()
            @addVisual lastVisualPos until @visuals.length == visualsRequired

            visual.setTo(1) for visual in @visuals[0..-2]
            @visuals[@visuals.length - 1].setTo(if rem == 0 and intpart != 0 then 1 else rem)

            @tweenVisuals()

        tweenVisuals: ->
            @tweenVisual visual, @calculateVisualPos(i) for visual, i in @visuals

        tweenVisual: (visual, pos) ->
            #visual.node.tween.destroy() if visual.node.tween?
            visual.node.tween = new Kinetic.Tween
                node: visual.node
                x: pos.x
                y: pos.y
                easing: Kinetic.Easings.EaseOut
                duration: 0.5
            visual.node.tween.play()

        onDrag: (visual,val) ->
            @frac.numerator.value = @visuals.indexOf(visual) * @frac.denominator.value + Math.ceil(val * @frac.denominator.value)
