/**
 * @author: Ruben Tytgat
 */

define(['class','kinetic','widgets/include/events'], function(Class,Kinetic,Events) {

    var TAU = 2 * Math.PI;

    return Class.extend({
        init: function (widget, tickFunc, tickSetFunc, ticksPerRotation) {
            this.widget = widget;
            this.node = new Kinetic.Group();
            this._initHandles();
            this.tickFunc = tickFunc;
            this.tickSetFunc = tickSetFunc;
            this.ticksPerRotation = ticksPerRotation;
        },
        _initHandles: function() {
            var handles = this._makeHandles();
            handles.forEach(function(handle) {
                this.node.add(handle);
                handle.on('pointdown', this._onMoveHandle.bind(this));
                handle.addClass('button');
            }.bind(this));
        },
        _onMoveHandle: function(e) {
            this._savedAngle = this._getCurrentAngle();
            this.widget.beginManipulation();
            this.onDragStart();
            Events.hookStageMovement(this._reportArmMovement.bind(this),this._onEndMoveHandle.bind(this));
            this._reportArmMovement(e);
        },
        _onEndMoveHandle: function() {
            this.onDragEnd();
            this.widget.endManipulation();
        },
        _ticks2Angle: function(ticks) {
            return TAU * ticks / this.ticksPerRotation;
        },
        _angle2Ticks: function(angle) {
            return angle * this.ticksPerRotation / TAU;
        },
        _getCurrentAngle: function() {
            return this._ticks2Angle(this.tickFunc());
        },
        _reportArmMovement: function() {
            var pp = this.node.getStage().getPointerPosition();
            var relMousePos = this.node.getAbsoluteToLocalSpaceTransform().transformPoint(pp);
            var savedAngle = this._savedAngle;
            var currentAngle = (TAU / 4) + Math.atan2(relMousePos.y, relMousePos.x);
            //if(currentAngle < 0) {
            //    currentAngle = TAU + currentAngle;
            //}
            var angleDiff = currentAngle - savedAngle;
            if(Math.abs(angleDiff) > TAU / 2) {
                angleDiff = angleDiff - TAU * angleDiff / Math.abs(angleDiff);
            }

            this.tickSetFunc(this._angle2Ticks(angleDiff));
            this._savedAngle = currentAngle;
        },
        update: function() {
            this._setAngle(this._getCurrentAngle());
        },
        onDragStart: function() {
        },
        onDragEnd: function() {
        }
    });
});
