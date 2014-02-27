var Vec1 = ((function () {
    var ProtoVector = {
        init: function (args) {
            this.coords = args;
            this.dim = this.coords.length;
        },

        addScalar: function (scal) {
            return createVector(this.coords.map(function (coord) {
                return scal + coord;
            }));
        }
    };

    function createVector(args) {
        var v = Object.create(ProtoVector);
        v.init(args);
        return v;
    }

    var Vector = {
        create: createVector
    };

    Object.freeze(Vector);

    return {
        Vector: Vector
    };
})());

var Vec2 = ((function () {
    function createVector(args) {
        var coords, dim;

        function init() {
            coords = args;
            dim = coords.length;
        }

        function addScalar(scal) {
            return createVector(coords.map(function (coord) {
                return scal + coord;
            }));
        }

        init();

        return {
            addScalar: addScalar
        };
    }

    var Vector = {
        create: createVector
    };

    Object.freeze(Vector);

    return {
        Vector: Vector
    };
})());

