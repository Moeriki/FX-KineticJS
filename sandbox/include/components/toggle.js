define([
    'class',
    'kinetic',
    'lodash',
    'widgets/include/patterns/fsm',
    'include/code'
], function (Class, Kinetic, _, FSM, Code) {

    var ProtoToggleMode = {
        init: function (
    };

    var ProtoToggle = {
        _init: function (modes, args) {
            this.node = new Kinetic.Group(args);

            if (_.isArray(modes)) {
                this._initStartMode(modes[0]);
                _(modes.slice(1)).forEach(function (mode) {
                    this.addMode(mode);
                });
            }
            else {
                this._initStartMode(modes);
            }

            this.node.on('tap', _.bind(this.fsm.transition, this.fsm));
            this.node.addClass('button');
        },

        _initStartMode: function (mode) {
            this.lastState = this.generateStateFor(mode);
            this.lastState.transitions.push(FSM.Transition.create(this.lastState));
            this.fsm = FSM.FiniteStateMachine.create(this.lastState, false);
            mode.node.setVisible(true);
        },
            
        addMode: function (mode) {
            prevLastState = this.lastState;
            newState = this.generateStateFor(mode);

            newState.transitions.push(prevLastState.transitions.pop());
            prevLastState.transitions.push(FSM.Transition.create(newState));
            
            this.lastState = newState;
        },

        generateStateFor: function (mode) {
            this.node.add(mode.node);
            mode.node.setVisible(false)

            return FSM.State.create(_.bind(function () {
                mode.node.setVisible(true);

                if(mode.onEnter != null)
                    mode.onEnter();

                this.node.getLayer().batchDraw();
            }), _.bind(function () {
                mode.node.setVisible(false);

                if(mode.onLeave != null)
                    mode.onLeave();
            });
        }
    };

    var ToggleMode = {
        create: function (node, onEnter, onLeave) {
            return {
                node: node,
                onEnter: onEnter,
                onLeave: onLeave
            };
        }
    };
    var Toggle = {
        create: function (modes, args) {
            var t = Object.create(ProtoToggle);
            t._init(modes, args);
            return t;
        }
    };
    var BinaryToggle = {
        create: function (func,onImg,offImg,deflt,args) {
            var t = Toggle.create(ToggleMode.create(onImg, _.bind(func, null, deflt)), args);
            t.addMode(ToggleMode.create(offImg, _.bind(func, null, !deflt));
            return t;
        }
    }

    return {
        ToggleMode: ToggleMode,
        Toggle: Toggle,
        BinaryToggle: BinaryToggle
    };
});
