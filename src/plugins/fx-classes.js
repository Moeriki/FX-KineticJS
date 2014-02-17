/**
    @author Dieter Luypaert <dieter@foursevens.be>
*/

(function() {

    var ClassList = function(node) {
        this.node = node;

        if(!this.node.attrs.classes) {
            this.node.attrs.classes = [];
        }
    };

    ClassList.prototype = {

        add: function(name) {
            if(!this.contains(name)) {
                this.node.attrs.classes.push(name);
            }

            return this;
        },

        toggle: function(name) {
            if(this.contains(name)) {
                this.remove(name);
            } else {
                this.add(name);
            }

            return this;
        },

        remove: function(name) {
            var classes, existsAt;

            classes = this.node.attrs.classes;
            if(classes) {
                existsAt = classes.indexOf(name);

                if(existsAt > -1) {
                    classes.splice(existsAt, 1);
                }
            }

            return this;
        },

        contains: function(name) {
            return this.node.attrs.classes.indexOf(name) !== -1;
        },

    };

    Kinetic.Util.addMethods(Kinetic.Node, {

        classList: function() {
            if(!this._classList) {
                this._classList = new ClassList(this);
            }
            return this._classList;
        },

    });

    //TODO classes should be a ES6 Set instead of Array
    Kinetic.Factory.addGetterSetter(Kinetic.Node, 'classes');

})();
