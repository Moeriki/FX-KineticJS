define [
	'class'
], (Class) ->

    AccessType = Object.freeze
        GET: 1
        SET: 2
        BOTH: 3
        
    PropertyAdapter = Class.extend
        init: (tgt, props) ->
            @tgt = tgt
            @_addProp name, propdata for name, propdata of props

        _addProp: (name, propdata) ->
            Object.defineProperty @, name, @_buildPropAccessors(propdata)

        _buildPropAccessors: (propdata) ->
            if propdata.type == AccessType.BOTH
                get: @_makeGetter propdata
                set: @_makeSetter propdata
            else if propdata.type == AccessType.GET
                get: @_makeGetter propdata
            else
                set: @_makeSetter propdata

        _makeGetter: (propdata) ->
            ->
                @tgt[propdata.name]

        _makeSetter: (propdata) ->
            (v) ->
                @tgt[propdata.name] = v

    AccessType: AccessType
    PropertyAdapter: PropertyAdapter
