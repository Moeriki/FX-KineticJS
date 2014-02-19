###
 @author: Ruben Tytgat
###

define ['class'], (Class) ->

    trueFunc = ->
        true

    State: Class.extend
        init: (onEnter = null, onLeave = null) ->
            @transitions = []
            @onEnter = onEnter
            @onLeave = onLeave

        enter: ->
            @onEnter() if @onEnter?

        leave: ->
            @onLeave() if @onLeave?

        getAvailableTransition: ->
            return transition for transition in @transitions when transition.canTransition()
            null

    Transition: Class.extend
        init: (targetState, condition = trueFunc, onTransition = null) ->
            @condition = condition
            @onTransition = onTransition
            @targetState = targetState

        canTransition: ->
            @condition()

        transition: ->
            throw "Transition condition not met!" if not @canTransition()
            @onTransition() if @onTransition?
            @targetState

    FiniteStateMachine: Class.extend
        init: (startState, enterFirst = true) ->
            @currentState = startState
            @currentState.enter() if enterFirst

        transition: ->
            transition = @currentState.getAvailableTransition()
            if transition?
                @currentState.leave()
                @currentState = transition.transition()
                @currentState.enter()
