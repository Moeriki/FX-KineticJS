define [
    'class'
    'lodash'
    'widgets/include/math/basic'
], (Class,_,BasicMath) ->

    TAU = 2 * Math.PI

    isInRect = (point, lefttop, rightbottom) ->
        point.x > lefttop.x and point.y > lefttop.y and point.x < rightbottom.x and point.y < rightbottom.y


    ###
     Vector math in an Euclidian vector space
    ###
    Vector = Class.extend
        init: (coords...) ->
            throw "Vector must at least have dimension 1" if coords.length == 0
            
            first = coords[0]

            if _.isArray first
                @coords = first.slice()
            else if _.isObject first
                @_loadCoordsFromObject first
            else if _.isNumber first
                @coords = coords

            @dim = @coords.length

        _loadCoordsFromObject: (obj) ->
            if obj.z?
                @coords = [obj.x,obj.y,obj.z]
            else
                @coords = [obj.x,obj.y]

        dup: ->
            new Vector(@)

        add: (other) ->
            new Vector(@coords[i] + other.coords[i] for i in [0...@dim])

        addScalar: (scal) ->
            new Vector(scal + coord for coord in @coords)

        mulScalar: (scal) ->
            new Vector(scal * coord for coord in @coords)

        mulInner: (other) ->
            throw "Cannot apply inner product on vectors of different dimensions!" if @dim != other.dim

            BasicMath.sum(@coords[i] * other.coords[i] for i in [0...@dim])

        equals: (other) ->
            return false if @dim != other.dim
            @coords.every (coord, i) ->
                coord == other.coords[i]

        # Derived operations
        sub: (other) ->
            @add(other.neg)

        subScalar: (scal) ->
            @addScalar(-scal)

        divScalar: (scal) ->
            @mulScalar(1/scal)

        scalarProjection: (other) ->
            @mulInner(other.unit)

        projection: (other) ->
            other.unit.mulScalar(@scalarProjection(other))

        rejection: (other) ->
            @sub(@projection(other))

        distance: (other) ->
            @sub(other).norm

    # Derived properties
    Object.defineProperty Vector::, 'neg',
        get: ->
            @mulScalar(-1)

    Object.defineProperty Vector::, 'norm',
        get: ->
            Math.sqrt @mulInner @

    Object.defineProperty Vector::, 'unit',
        get: ->
            @divScalar(@norm)

    # Helpers
    Object.defineProperty Vector::, 'x',
        get: ->
            @coords[0]
        set: (v) ->
            @coords[0] = v

    Object.defineProperty Vector::, 'y',
        get: ->
            @coords[1]
        set: (v) ->
            @coords[1] = v
            
    Object.defineProperty Vector::, 'z',
        get: ->
            @coords[2]
        set: (v) ->
            @coords[2] = v

    Vector.origin = (dim) ->
        new Vector(0 for i in [0...dim])

    # Constants
    Vector.origin2D = Object.freeze(Vector.origin(2))
    Vector.origin3D = Object.freeze(Vector.origin(3))


    Matrix = Class.extend
        init: (arg) ->
            throw "Matrix must at least have dimension of [1,1]" if arg.length == 0
            
            if _.isArray arg
                throw "Matrix must at least have dimension of [1,1]" if arg[0].length == 0
                @data = line.slice() for line in arg
            else if _.isObject arg
                @data = line.slice() for line in arg.data
            else throw "Invalid arguments to Matrix constructor"

            @dim = [@data.length,@data[0].length]

        dup: ->
            new Matrix(@)

        add: (other) ->
            new Matrix(@data[i][j] + other.data[i][j] for j in [0...@dim[1]] for i in [0...@dim[0]])

        mul: (other) ->
            newDim = [@dim[0],other.dim[1]]
            leftVecs = @horizontalVectors
            rightVecs = other.verticalVectors
            new Matrix(leftVecs[i].mulInner(rightVecs[j]) for j in [0...@dim[1]] for i in [0...@dim[0]])

        addScalar: (scal) ->
            new Matrix(@data[i][j] + scal for j in [0...@dim[1]] for i in [0...@dim[0]])

        mulScalar: (scal) ->
            new Matrix(@data[i][j] * scal for j in [0...@dim[1]] for i in [0...@dim[0]])

    Object.defineProperty Matrix::, 'transpose',
        get: ->
            new Matrix(@data[i][j] for i in [0...@dim[0]] for j in [0...@dim[1]])

    Object.defineProperty Matrix::, 'horizontalVectors',
        get: ->
            new Vector(line) for line in @data

    Object.defineProperty Matrix::, 'verticalVectors',
        get: ->
            @transpose.horizontalVectors


    ###
     Trigonometry
    ###
    makeTrigonometricRatioSolver = (angFunc, numerator, denominator) ->
        obj = {}
        obj["solveFor#{angFunc}"] = (num, denom) ->
            num / denom
        obj["solveFor#{numerator}"] = (ang, denom) ->
            ang * denom
        obj["solveFor#{denominator}"] = (ang, num) ->
            num / ang
        obj

    RAT =
        TrigonometricRatios:
            toa: makeTrigonometricRatioSolver 'Tan', 'Opposing', 'Adjacent'
            soh: makeTrigonometricRatioSolver 'Sin', 'Opposing', 'Hypotenuse'
            cah: makeTrigonometricRatioSolver 'Cos', 'Adjacent', 'Hypotenuse'
            sha: makeTrigonometricRatioSolver 'Sec', 'Hypotenuse', 'Adjacent'
            cao: makeTrigonometricRatioSolver 'Cot', 'Adjacent', 'Opposing'
            cha: makeTrigonometricRatioSolver 'Csc', 'Hypotenuse', 'Adjacent'

        Pythagoras:
            solveForA: (b,c) ->
                Math.sqrt c * c - b * b

            solveForB: (a,c) ->
                Math.sqrt c * c - a * a

            solveForC: (a,b) ->
                Math.sqrt a * a + b * b
            
    isInRect: isInRect
    Vector: Vector
    RAT: RAT
    TAU: TAU


