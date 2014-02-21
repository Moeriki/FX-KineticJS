/*
 @author: Ruben Tytgat
*/

define([
    'lodash'
], function (_) {

    function trueFunc() {
        return true;
    }

    function createState() {
        var transitions = [],
            onEnter = arguments[0],
            onLeave = arguments[1];

        return {
            enter: function () {
                if(onEnter != null)
                    onEnter();
            },
            leave: function () {
                if(onLeave != null)
                    onLeave();
            },
            getAvailableTransition: function () {
                var transitionables = _(transitions).filter('canTransition');
                return transitionables.length == 0 ? null : transitionables.first();
            }
        };
    }
    var State = {
        create: createState
    };


    function createTransition() {
        var targetState = arguments[0],
            condition = arguments[1],
            onTransition = arguments[2];

        return {
            get canTransition () {
                return condition();
            },
            transition: function () {
                if(!canTransition())
                    throw "Transition condition not met!";

                if(onTransition != null)
                    onTransition();

                return targetState;
            }
        };
    }
    var Transition = {
        create: createTransition
    };


    function createFiniteStateMachine() {
        var currentState = arguments[0];

        if(enterFirst)
            currentState.enter();

        return {
            transition: function () {
                transition = currentState.getAvailableTransition();
                if(transition != null) {
                    currentState.leave();
                    currentState = transition.transition();
                    currentState.enter();
                }
            }
        };
    }
    var FiniteStateMachine = {
        create: createFiniteStateMachine
    };

    return {
        State: State,
        Transition: Transition,
        FiniteStateMachine: FiniteStateMachine
    };
});
