/**
    @author Dieter Luypaert <dieter@foursevens.be>
*/

/*globals
    suite:true, test:true, assert:true
*/

'use strict';

suite('FX Extensions', function() {

    suite('classList', function() {

        test('#add', function() {
            var node = new Kinetic.Shape();

            node.classList().add('testClassName');

            assert.equal(node.getClasses().length, 1);
            assert.equal(node.getClasses()[0], 'testClassName');
        });

        test('#toggle', function() {
            var node = new Kinetic.Shape();

            node.classList().toggle('testClassName');

            assert.equal(node.getClasses().length, 1);
            assert.equal(node.getClasses()[0], 'testClassName');

            node.classList().toggle('testClassName');

            assert.equal(node.getClasses().length, 0);
        });

        test('#remove', function() {
            var node = new Kinetic.Shape();

            node.classList().add('testClassName');
            node.classList().remove('testClassName');

            assert.equal(node.getClasses().length, 0);
        });

        test('#contains', function() {
            var node = new Kinetic.Shape();

            node.classList().add('testClassName');

            assert.equal(node.classList().contains('testClassName'), true);
        });

        test('#containsAny');

        test('#containsAll');

    });

});

suite('Container', function() {

    suite('find', function() {

        test('findByClass');

    });

});
