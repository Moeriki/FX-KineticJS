define([
	'lodash',
	'kinetic',
    'include/code',
    'include/patterns/observer'
], function (_,Kinetic,Code,Observer) {
    'use strict';

    var standardScaleTickLength = function (scale, i) {
        // Calculate the width depending on whether the tick is a unit, 1/2 or 1/10 tick.
        if(i % 10 === 0)
            return scale.width;
        else if(i % 5 === 0)
            return scale.width / 2;
        else
            return scale.width / 4;
    };

    var standardRulerTickLength = function (scale, i) {
        // Calculate the width depending on whether the tick is a unit, 1/2 or 1/10 tick.
        if(i % 10 === 0)
            return scale.width;
        else if(i % 5 === 0)
            return scale.width * 3 / 4;
        else
            return scale.width / 2;
    };
	
    var ProtoScale = {
        _init: function (width,min,max,density,style,attrs) {
            this._width = width;
            this._density = density;
            this._style = style;
            this._min = min;
            this._max = max;

            this.initSubject();
            this._initNode(attrs);
            this._initLine();
        },

        _initNode: function (attrs) {
            this.node = new Kinetic.Group(attrs);
            this.ticks = new Kinetic.Group();
            this.node.add(this.ticks);
        },

        _initLine: function () {
            var line = this.style.makeLine(this);

            if (line != null)
                this.node.add(line);
        },

        num2Pos: function (n) {
            return this.tickIndex2Pos(this.num2TickIndex(n));
        },
        
        pos2Num: function (x) {
            return this.tickIndex2Num(this.pos2TickIndex(x));
        },

        tickIndex2Pos: function (i) {
            return i * this.density;
        },

        pos2TickIndex: function (x) {
            return x / this.density;
        },

        update: function (minpos, maxpos) {
            if (minpos == null)
                minpos = this.minPos;
            if (maxpos == null)
                maxpos = this.maxPos;

            this.ticks.destroyChildren();
            this._addTicks(minpos, maxpos);
        },

        _addTicks: function (minpos, maxpos) {
            // Potentially add a tick for each possible number. this.addTick will ignore invalid tick requests
            _   .range(Math.round(Math.max(this.pos2TickIndex(minpos),this.num2TickIndex(this.min))), Math.round(Math.min(this.pos2TickIndex(maxpos),this.num2TickIndex(this.max))) + 1)
                .forEach(_.bind(function (i) {
                    this._addTick(i);
                }, this));
        },

        _addTick: function (i) {
            // Convert num to tick index
            var num = this.tickIndex2Num(i);

            //// Ignore invalid ticks
            //return unless i?
            
            if (!this.shouldDrawTick(i))
                return;

            // Convert tick index to x coordinate
            var x = this.tickIndex2Pos(i);

            // Create a kinetic shape for it
            this.ticks.add(this.style.makeTick(this, i, x));

            // Create the numbers
            if (this.style.hasNumber(this, i, num))
                this.ticks.add(this.style.makeNumber(this, i, x, num));
        },

        shouldDrawTick: function (i) {
            return true;
        },

        get minPos () {
            return this.num2Pos(this.min);
        },

        get maxPos () {
            return this.num2Pos(this.max);
        }
    };

    Observer.mixinSubject(ProtoScale);
    Observer.defineNotifyingProperty(ProtoScale, 'min');
    Observer.defineNotifyingProperty(ProtoScale, 'max');
    Observer.defineNotifyingProperty(ProtoScale, 'density');
    Observer.defineNotifyingProperty(ProtoScale, 'style');
    Observer.defineNotifyingProperty(ProtoScale, 'width');

    return {
        standardScaleTickLength: standardScaleTickLength,
        standardRulerTickLength: standardRulerTickLength,
        ProtoScale: ProtoScale
    };
});