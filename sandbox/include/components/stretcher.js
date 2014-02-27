define([
	'class',
	'kinetic',
    'widgets/include/events',
    'widgets/include/patterns/observer',
    'widgets/include/propertyadapter',
    'widgets/include/math/misc',
    'whiteboard'
], function (Class, Kinetic, Events, Observer, PropertyAdapter, MiscMath, Whiteboard) {

    // Interface Stretchable:
    //  - property height: set
    //      Sets the height of the control.

    var StandardStretcherStyle = {
        makeHandle: function () {
            return new Kinetic.Image({
                image: greyArrowImg,
                width: 25,
                height: 15,
                offset: [12.5, 7.5],
                scale: 0.75
            });
        },

        height2HandlePos: function (h) {
            return -h - 50;
        },

        handlePos2Height: function (y) {
            return -y - 50;
        }
    };

    var ProtoStretcher = {
        _init: function (widget, stretchables, style, minHeight, maxHeight, attrs) {
            this.widget = widget;
            this.stretchables = stretchables;
            this.style = style;
            this.initSubject();
            this.__height = 0;
            this.minHeight = minHeight;
            this.maxHeight = maxHeight;
            this.registerObserver(_.bind(this.update, this));
            this._initNode(attrs);
            this._initDragHandle();
        },

        placed: function (height) {
            this.height = height;
        },

        _initNode: function (attrs) {
            this.node = new Kinetic.Group(attrs);
        },

        _initDragHandle: function () {
            this.drag = this.style.makeHandle();
            this.drag.setPosition({
                x: 0,
                y: this.style.height2HandlePos(this.__height)
            });
            this.drag.addClass('button');

            this.drag.on('pointdown', _.bind(function () {
                this.widget.beginManipulation();
                Events.hookStageMovement(_.bind(this._onDrag, this), _.bind(this.widget.endManipulation, this.widget));
            }));

            this.node.add(this.drag);
        },

        _onDrag: function (e) {
            localMouse = this.node.getAbsoluteToLocalSpaceTransform().transformPoint(Whiteboard.stage.getPointerPosition());
            this.height = MiscMath.clamp(this.style.handlePos2Height(localMouse.y), this.minHeight, this.maxHeight);
        },

        update: function () {
            this.drag.setPosition({
                x: 0,
                y: this.style.height2HandlePos(this.__height)
            });
            this.node.getLayer().batchDraw();
        },

        set _height(h) {
            this.__height = h;
            _(this.stretchables).forEach(function (stretchable) {
                stretchable.height = h;
            });
        }
    };

    Observer.mixinSubject(ProtoStretcher);
    Observer.defineNotifyingProperty(ProtoStretcher, 'height');

    var Stretcher = {
        create: function (widget, stretchables, style, minHeight, maxHeight, attrs) {
            if(minHeight == null)
                minHeight = 0;
            if(maxHeight == null)
                maxHeight = Infinity;

            var s = Object.create(ProtoStretcher);
            s._init(widget, stretchables, style, minHeight, maxHeight, attrs);
            return s;
        }
    };

    // Implements Stretchable
    var StretchAdapter = {
        create: function (tgt, attr) {
            return PropertyAdapter.PropertyAdapter.create(tgt, {
                height: {
                    name: attr,
                    type: PropertyAdapter.AccessType.SET
                }
            });
        }
    };

    return {
        Stretcher: Stretcher,
        StretchAdapter: StretchAdapter
    };
});
