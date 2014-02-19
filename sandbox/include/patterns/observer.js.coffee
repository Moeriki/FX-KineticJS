###
 @author: Ruben Tytgat
###

define ['class','jquery'], (Class,$) ->

    # Mixin to add Observer subject logic
    mixinSubject: (target) ->
        $.extend target,
            initSubject: ->
                @_observers = []

            registerObserver: (o) ->
                @_observers.push(o)

            unregisterObserver: (o) ->
                i = @_observers.indexOf(o)
                @_observers.splice(i,1) if i != -1

            notifyObservers: (args...) ->
                observer(args...) for observer in @_observers

    defineNotifyingProperty: (obj,name,args...) ->
        Object.defineProperty obj, name,
            get: ->
                @["_#{name}"]
            set: (n) ->
                @["_#{name}"] = n
                @notifyObservers(args...)

    defineWriteOnlyNotifyingProperty: (obj,name,args...) ->
        Object.defineProperty obj, name,
            set: (n) ->
                @["_#{name}"] = n
                @notifyObservers(args...)
