/*
 @author: Ruben Tytgat
*/

define([
    'lodash'
], function (_) {

    function trueFunc() {
        return true;
    }

    var ProtoState = {
        enter: function () {
            if(this.onEnter != null)
                this.onEnter();
        },
        leave: function () {
            if(this.onLeave != null)
                this.onLeave();
        },
        getAvailableTransition: function () {
            var transitionables = _(this.transitions).filter('canTransition');
            return transitionables.length == 0 ? null : transitionables.first();
        }
    }

    var State = {
        create: function (onEnter, onLeave) {
            var s = Object.create(ProtoState);

            s.transitions = [];
            s.onEnter = onEnter;
            s.onLeave = onLeave;

            return s;
        }
    };


    var ProtoTransition = {
        get canTransition () {
            return this.condition();
        },
        transition: function () {
            if(!this.canTransition())
                throw "Transition condition not met!";

            if(this.onTransition != null)
                this.onTransition();

            return this.targetState;
        }
    };

    var Transition = {
        create: function (targetState, condition, onTransition) {
            var t = Object.create(ProtoTransition);

            t.targetState  = targetState;
            t.condition    = condition;
            t.onTransition = onTransition;

            return t;
        }
    };


    var ProtoFiniteStateMachine = {
        transition: function () {
            var transition = this.currentState.getAvailableTransition();
            if(transition != null) {
                this.currentState.leave();
                this.currentState = transition.transition();
                this.currentState.enter();
            }
        }
    };

    var FiniteStateMachine = {
        create: function (currentState, enterFirst) {
            var f = Object.create(ProtoFiniteStateMachine);

            f.currentState = currentState;
            if(enterFirst)
                f.currentState.enter();

            return f;
        }
    };

    return {
        State: State,
        Transition: Transition,
        FiniteStateMachine: FiniteStateMachine
    };
});
