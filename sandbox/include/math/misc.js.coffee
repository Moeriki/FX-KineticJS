define ->
    clamp: (x,l,h) ->
        if x < l
            l
        else if x > h
            h
        else
            x

    between: (x,l,h) ->
        l <= x and x <= h

    partitionRange: (l,h,n) ->
        d = h - l
        s = d / n
        for i in [0...n]
            lowerBound: l + i * s
            upperBound: l + (i+1) * s

    sign: (x) ->
        if x >= 0
            1
        else
            -1
