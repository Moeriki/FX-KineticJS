define [
    'class'
    'kinetic'
    'lodash'
    'widgets/include/patterns/fsm'
], (Class, Kinetic, _, FSM) ->

    ToggleMode = Class.extend
        init: (node,onEnter = null,onLeave = null) ->
            @node = node
            @onEnter = onEnter
            @onLeave = onLeave

    Toggle = Class.extend
        init: (modes, args) ->
            @node = new Kinetic.Group args

            if _.isArray modes
                @initStartMode modes[0]
                @addMode mode for mode in modes[1..]
            else
                @initStartMode modes

            @node.on 'tap', @fsm.transition.bind @fsm
            @node.addClass 'button'

        initStartMode: (mode) ->
            @lastState = @generateStateFor mode
            @lastState.transitions.push new FSM.Transition @lastState
            @fsm = new FSM.FiniteStateMachine @lastState, false
            mode.node.setVisible true
            
        addMode: (mode) ->
            prevLastState = @lastState
            newState = @generateStateFor mode

            newState.transitions.push prevLastState.transitions.pop()
            prevLastState.transitions.push new FSM.Transition newState
            
            @lastState = newState

        generateStateFor: (mode) ->
            #@node.removeChildren()
            @node.add mode.node
            mode.node.setVisible false

            new FSM.State (=>
                mode.node.setVisible true
                mode.onEnter() if mode.onEnter?
                @node.getLayer().batchDraw()
            ), (=>  # OPTME MAYBE: Possible optimization: don't bind if no onLeave present
                mode.node.setVisible false
                mode.onLeave() if mode.onLeave?
            )


    BinaryToggle = Toggle.extend
        init: (func,onImg,offImg,deflt,args) ->
            @_super new ToggleMode(onImg, (-> func deflt)), args
            @addMode new ToggleMode(offImg, (-> func !deflt))


    ToggleMode: ToggleMode
    Toggle: Toggle
    BinaryToggle: BinaryToggle
