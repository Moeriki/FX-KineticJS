define [
	'class'
	'kinetic'
    'widgets/include/patterns/observer'
], (Class,Kinetic,Observer) ->

    standardScaleTickLength = (scale, i) ->
        # Calculate the width depending on whether the tick is a unit, 1/2 or 1/10 tick.
        if i % 10 == 0
            scale.width
        else if i % 5 == 0
            scale.width / 2
        else
            scale.width / 4

    standardRulerTickLength = (scale, i) ->
        # Calculate the width depending on whether the tick is a unit, 1/2 or 1/10 tick.
        if i % 10 == 0
            scale.width
        else if i % 5 == 0
            scale.width * 3 / 4
        else
            scale.width / 2
	
    Scale = Class.extend
        init: (width,min,max,density,style,attrs) ->
            @_width = width
            @_density = density
            @_style = style
            @_min = min
            @_max = max

            @initSubject()
            @initNode(attrs)
            @initLine()

        initNode: (attrs) ->
            @node = new Kinetic.Group attrs
            @ticks = new Kinetic.Group()
            @node.add @ticks

        initLine: ->
            line = @style.makeLine @
            @node.add line if line?

        num2Pos: (n) ->
            @tickIndex2Pos @num2TickIndex n

        pos2Num: (x) ->
            @tickIndex2Num @pos2TickIndex x

        tickIndex2Pos: (i) ->
            i * @density

        pos2TickIndex: (x) ->
            x / @density

        update: (minpos = @minPos, maxpos = @maxPos) ->
            @ticks.destroyChildren()
            @addTicks minpos, maxpos

        addTicks: (minpos = @minPos, maxpos = @maxPos) ->
            # Potentially add a tick for each possible number. @addTick will ignore invalid tick requests
            @addTick i for i in [Math.round(Math.max(@pos2TickIndex(minpos),@num2TickIndex(@min)))..Math.round(Math.min(@pos2TickIndex(maxpos),@num2TickIndex(@max)))]

        addTick: (i) ->
            # Convert num to tick index
            num = @tickIndex2Num i

            ## Ignore invalid ticks
            #return unless i?
            
            return unless @shouldDrawTick i

            # Convert tick index to x coordinate
            x = @tickIndex2Pos i

            # Create a kinetic shape for it
            @ticks.add @style.makeTick @, i, x

            # Create the numbers
            if @style.hasNumber @, i, num
                @ticks.add @style.makeNumber @, i, x, num

        shouldDrawTick: (i) ->
            true

    Object.defineProperty Scale::, 'minPos',
        get: ->
            @num2Pos @min

    Object.defineProperty Scale::, 'maxPos',
        get: ->
            @num2Pos @max

    Observer.mixinSubject Scale::
    Observer.defineNotifyingProperty Scale::, 'min'
    Observer.defineNotifyingProperty Scale::, 'max'
    Observer.defineNotifyingProperty Scale::, 'density'
    Observer.defineNotifyingProperty Scale::, 'style'
    Observer.defineNotifyingProperty Scale::, 'width'

    standardScaleTickLength: standardScaleTickLength
    standardRulerTickLength: standardRulerTickLength
    Scale: Scale
