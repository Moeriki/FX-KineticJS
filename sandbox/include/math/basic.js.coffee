define ->
    sum = (l) ->
        l.reduce((a,b) -> a + b)

    average = (args...) ->
        sum(args) / args.length

    sum: sum
    average: average
