###
 @author: Ruben Tytgat

 Implements a fraction with observer notifications.
###
define [
    'widgets/widget-base'
    'kinetic'
    'class'
    'widgets/include/patterns/observer'
], (WidgetBase,Kinetic,Class,Observer) ->
    gcd = (a, b) ->
        if b == 0
            return a

        gcd(b, a % b)

    FracComponent = Class.extend
        init: (value) ->
            @initSubject()
            @value = value

    Observer.defineNotifyingProperty FracComponent::, 'value'

    Observer.mixinSubject FracComponent::

	##
    # Class that represents a numerical fraction
    Frac = Class.extend
        ##
        # Initialization.
        init: (numerator, denominator) ->
            @noAutoNotify = false
            @initSubject()
            @_numerator = new FracComponent(numerator)
            @_denominator = new FracComponent(denominator)
            @numerator.registerObserver @tryNotifyObservers.bind @
            @denominator.registerObserver @tryNotifyObservers.bind @

        ##
        # Set numerator and denominator in one go. One can also assign to the fields.
        # Only sends 1 notify
        set: (numerator, denominator) ->
            @noAutoNotify = true
            @numerator.value = numerator
            @denominator.value = denominator
            @noAutoNotify = false
            @notifyObservers()

        simplify: ->
            g = gcd(@numerator.value, @denominator.value)
            @set(@numerator.value / g, @denominator.value / g)

        tryNotifyObservers: ->
            @notifyObservers() unless @noAutoNotify

    ##
    # Property for the quotient
    Object.defineProperty Frac::, 'quotient',
        get: ->
            @numerator.value / @denominator.value

    ##
    # Property for the numerator
    Object.defineProperty Frac::, 'numerator',
        get: ->
            @_numerator

    ##
    # Property for the denominator
    Object.defineProperty Frac::, 'denominator',
        get: ->
            @_denominator

    Object.defineProperty Frac::, 'wholes',
        get: ->
            Math.floor(@quotient)

    Object.defineProperty Frac::, 'remainder',
        get: ->
            @quotient % 1

    ##
    # Add the observer pattern mixin
    Observer.mixinSubject Frac::

    Frac
