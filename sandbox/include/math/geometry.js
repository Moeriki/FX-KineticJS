define([
    'lodash',
    'include/math/basic'
], function (_,BasicMath) {
    'use strict';

    var TAU = 2 * Math.PI;

    function isInRect(point, lefttop, rightbottom) {
        return point.x > lefttop.x && point.y > lefttop.y && point.x < rightbottom.x && point.y < rightbottom.y;
    }


    /*
     Vector math in an Euclidian vector space
    */

    var ProtoVector = {
        init: function (args) {
            if(args.length == 0)
                throw "Vector must at least have dimension 1";
            
            var first = args[0];

            if(_.isArray(first))
                this.coords = first.slice();
            else if(_.isObject(first))
                this._loadCoordsFromObject(first);
            else if(_.isNumber(first))
                this.coords = args;

            this.dim = this.coords.length;
        },

        _loadCoordsFromObject: function (obj) {
            if(obj.z != null)
                this.coords = [obj.x,obj.y,obj.z];
            else
                this.coords = [obj.x,obj.y];
        },

        dup: function () {
            return Vector.create(this);
        },

        add: function (other) {
            return Vector.create(_.range(0,this.dim).map(function (i) {
                return this.coords[i] + other.coords[i];
            }));
        },

        addScalar: function (scal) {
            return Vector.create(_(this.coords).map(function (coord) {
                return scal + coord;
            }).value());
        },

        mulScalar: function (scal) {
            return Vector.create(_(this.coords).map(function (coord) {
                return scal * coord;
            }).value());
        },

        mulInner: function (other) {
            if(this.dim != other.dim)
                throw "Cannot apply inner product on vectors of different dimensions!";

            return BasicMath.sum(_.range(0,this.dim).map(function (i) {
                return this.coords[i] * other.coords[i];
            }));
        },

        equals: function (other) {
            if(this.dim != other.dim)
                return false;

            return _(this.coords).every(function (coord, i) {
                return coord == other.coords[i];
            });
        },

        // Derived operations
        sub: function (other) {
            return this.add(other.neg);
        },

        subScalar: function (scal) {
            return this.addScalar(-scal);
        },

        divScalar: function (scal) {
            return this.mulScalar(1/scal);
        },

        scalarProjection: function (other) {
            return this.mulInner(other.unit);
        },

        projection: function (other) {
            return other.unit.mulScalar(scalarProjection(other));
        },

        rejection: function (other) {
            return this.sub(this.projection(other));
        },

        distance: function (other) {
            return this.sub(other).norm;
        },

        get neg() {
            return this.mulScalar(-1);
        },

        get norm () { 
            return Math.sqrt(this.mulInner(this));
        },

        get unit () { 
            return this.divScalar(this.norm);
        },

        get x () { 
            return this.coords[0];
        },

        set x (v) { 
            this.coords[0] = v;
        },

        get y () { 
            return this.coords[1];
        },

        set y (v) { 
            this.coords[1] = v;
        },

        get z () { 
            return this.coords[2];
        },

        set z (v) { 
            this.coords[2] = v;
        } 
    };

    var Vector = {
        create: function () {
            var v = Object.create(ProtoVector);
            v.init(Array.prototype.slice.apply(arguments));
            return v;
        },
        origin: function (dim) {
            return Vector.create(_.range(0,dim).map(function () {
                return 0;
            }));
        }
    };

    // Constants
    Vector.origin2D = Object.freeze(Vector.origin(2))
    Vector.origin3D = Object.freeze(Vector.origin(3))

    Object.freeze(Vector);

/*
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
*/

    /*
     Trigonometry
    */
    function makeTrigonometricRatioSolver(angFunc, numerator, denominator) {
        var obj = {};
        obj["solveFor#{angFunc}"] = function (num, denom) {
            return num / denom;
        }
        obj["solveFor#{numerator}"] = function (ang, denom) {
            return ang * denom;
        }
        obj["solveFor#{denominator}"] = function (ang, num) {
            return num / ang;
        }
        return obj;
    }

    var RAT = {
        TrigonometricRatios: {
            toa: makeTrigonometricRatioSolver('Tan', 'Opposing', 'Adjacent'),
            soh: makeTrigonometricRatioSolver('Sin', 'Opposing', 'Hypotenuse'),
            cah: makeTrigonometricRatioSolver('Cos', 'Adjacent', 'Hypotenuse'),
            sha: makeTrigonometricRatioSolver('Sec', 'Hypotenuse', 'Adjacent'),
            cao: makeTrigonometricRatioSolver('Cot', 'Adjacent', 'Opposing'),
            cha: makeTrigonometricRatioSolver('Csc', 'Hypotenuse', 'Adjacent')
        },

        Pythagoras: {
            solveForA: function (b,c) {
                return Math.sqrt(c * c - b * b);
            },

            solveForB: function (a,c) {
                return Math.sqrt(c * c - a * a);
            },

            solveForC: function (a,b) {
                return Math.sqrt(a * a + b * b);
            },
        }
    };
            
    return {
        isInRect: isInRect,
        Vector: Vector,
        RAT: RAT,
        TAU: TAU
    };
});

