/**
    @author Dieter Luypaert <dieterluypaert@gmail.com>
*/

(function() {
    'use strict';

    Kinetic.Kizzle = function(selector) {
        if(selector.kizzle) {
            return selector;
        }

        if(!(this instanceof Kinetic.Kizzle)) {
            return new Kinetic.Kizzle(selector);
        }

        this.kizzle = true;

        if(typeof selector !== 'string') {
            throw new Error('Kizzle selector must be a string');
        }

        var idIdx, nameIdx, attrsIdx, len,
            firstAttrsIdxOrLater, firstNameIdxOrLater, firstIdIdxOrLater;

        selector = selector.trim();

        // collect indices

        idIdx = selector.indexOf('#');
        nameIdx = selector.indexOf('.');
        attrsIdx = selector.indexOf('[');
        len = selector.length;

        firstAttrsIdxOrLater = (attrsIdx !== -1 ? attrsIdx : len);
        firstNameIdxOrLater = nameIdx !== -1 ? nameIdx : firstAttrsIdxOrLater;
        firstIdIdxOrLater = idIdx !== -1 ? idIdx : firstNameIdxOrLater;

        // check nodeType

        if(firstIdIdxOrLater !== 0) {
            this.nodeType = selector.substring(0, firstIdIdxOrLater);
        }

        // check id

        if(idIdx !== -1) {
            this.id = selector.substring(idIdx + 1, firstNameIdxOrLater);
        }

        // check name

        if(nameIdx !== -1) {
            this.name = selector.substring(nameIdx + 1, firstAttrsIdxOrLater);
        }

        // check attributes

        if(attrsIdx !== -1) {
            this.attrs = selector.substring(attrsIdx + 1, len - 1).split(',')
                .map(function(val) {
                    return val.split('=');
                });

            this.attrs.forEach(function(arr) {
                if(arr[0].charAt(0) === '!') {
                    arr[0] = arr[0].substring(1);
                    arr[2] = true;
                }

                if(!arr[1]) {
                    return;
                }

                if(!isNaN(arr[1])) {
                    arr[1] = Number(arr[1]);
                } else if(arr[1] === 'false') {
                    arr[1] = false;
                } else if(arr[1] === 'true') {
                    arr[1] = true;
                } else {
                    return;
                }
            });
        }

    };

    Kinetic.Kizzle.prototype = {

        matchAttrs: function(node) {
            var len, i, name, val, reverse;

            if(!node) {
                return false;
            }

            if(!this.attrs) {
                return true;
            }

            len = this.attrs.length;

            for(i = 0; i < len; i++) {
                name = this.attrs[i][0];
                val = this.attrs[i][1];

                if(typeof val !== 'undefined') {
                    if(val !== node.attrs[name]) {
                        return false;
                    }
                } else {
                    reverse = !!this.attrs[i][2];
                    if(Boolean(node.attrs[name]) === reverse) {
                        return false;
                    }
                }
            }

            return true;
        },

        match: function(node, checkNodeTypeNameOrId) {
            if(!node) {
                return false;
            }

            if(checkNodeTypeNameOrId) {
                if(checkNodeTypeNameOrId.id && this.id && this.id !== node.attrs.id) {
                    return false;
                }
                if(checkNodeTypeNameOrId.name && this.name && this.name !== node.attrs.name) {
                    return false;
                }
                if(checkNodeTypeNameOrId.nodeType && this.nodeType && this.nodeType !== node.nodeType) {
                    return false;
                }
            }

            return this.matchAttrs(node);
        },

        matchAll: function(node) {
            return this.match(node, {
                id: true,
                name: true,
                nodeType: true,
            });
        },

        filter: function(nodes) {
            var newArr = [],
                len, i, node;

            len = nodes.length;
            for(i = 0; i < len; i++) {
                node = nodes[i];
                if(this.matchAll(node)) {
                    newArr.push(node);
                }
            }

            return newArr;
        },

    };

    Kinetic.Util.addMethods(Kinetic.Container, {

        _get: function(kizz) {
            var nodes, clen, c;

            nodes = [];

            if(kizz.match(this, {nodeType: true})) {
                nodes.push(this);
            }

            clen = this.children.length;
            for(c = 0; c < clen; c++) {
                Array.prototype.push.apply(nodes, this.children[c]._get(kizz));
            }

            return nodes;
        },

        getChildren: function(selector) {
            var nodes, s;

            if(selector) {
                selector = selector.split(',').map(Kinetic.Kizzle);
                nodes = [];

                for(s = 0; s < selector.length; s++) {
                    Array.prototype.push.apply(nodes, (Kinetic.Kizzle(selector[s]).filter(this.children)));
                }

                return nodes;
            } else {
                return this.children;
            }
        },

        find: function(selector) {
            var s, nodes, kizz, node, clen, c;

            selector = selector.split(',').map(Kinetic.Kizzle);
            nodes = [];

            for(s = 0; s < selector.length; s++) {
                kizz = selector[s];

                if(kizz.id) {
                    node = this._getNodeById(kizz.id);
                    if(node) {
                        Array.prototype.push.apply(nodes, node._get(kizz));
                    }
                } else if(kizz.name) {
                    Array.prototype.push.apply(nodes, this._getNodesByName(kizz.name).filter(kizz.matchAttrs.bind(kizz)));
                } else {
                    clen = this.children.length;
                    for(c = 0; c < clen; c++) {
                        Array.prototype.push.apply(nodes, this.children[c]._get(kizz));
                    }
                }
            }

            return Kinetic.Collection.toCollection(nodes);
        },

        /**
        */
        first: function(selector, startAt) {
            var kizz, len, c;

            if(!selector) {
                return this.children[0];
            }

            kizz = Kinetic.Kizzle(selector);
            if(!startAt) {
                startAt = 0;
            }

            len = this.children.length;
            for(c = startAt; c < len; c++) {
                if(kizz.matchAll(this.children[c])) {
                    return this.children[c];
                }
            }
        },

        /**
        */
        last: function(selector, startAt) {
            var kizz, c;

            if(!selector) {
                return this.children[this.children.length - 1];
            }

            kizz = Kinetic.Kizzle(selector);
            if(startAt === undefined) {
                startAt = this.length;
            }

            for(c = startAt; c >= 0; c++) {
                if(kizz.matchAll(this.children[c])) {
                    return this.children[c];
                }
            }
        },

    });

    Kinetic.Util.addMethods(Kinetic.Node, {

        /**
        * Get the next node from its siblings. Returns undefined if this node is the last.
        * @method
        * @memberof Kinetic.Node.prototype
        * @param {number|string} selector - pass a number to get the next n node, or a kizzle selector to find the next node matching a certain condition
        * @returns {Kinetic.Node|undefined}
        */
        next: function(selector) {
            if(!selector) {
                selector = 1;
            }

            if(typeof selector === 'number') {
                return this.parent.children[this.index + selector];
            } else {
                return this.parent.first(selector, this.index + 1);
            }
        },

        /**
        * Get the previous node from its siblings. Returns undefined if this node is the first.
        * @method
        * @memberof Kinetic.Node.prototype
        * @returns {Kinetic.Node|undefined}
        */
        previous: function(selector) {
            if(!selector) {
                selector = 1;
            }

            if(typeof selector === 'number') {
                return this.parent.children[this.index - selector];
            } else {
                return this.parent.last(selector, this.index - 1);
            }
        },

        /**
        * Get all nodes that have the same parent as the current {@link Kinetic.Node}, (include the node itself.
        * @returns {[Kinetic.Node]}
        */
        siblings: function(selector) {
            return selector ? this.parent.getChildren(selector) : this.parent.children;
        },

        _get: function(kizz) {
            var nodes = [];

            if((!kizz.nodeType || kizz.nodeType === this.nodeType) && kizz.matchAttrs(this)) {
                nodes.push(this);
            }

            return nodes;
        },

    });

    Kinetic.Util.addMethods(Kinetic.Shape, {

        _get: function(kizz) {
            var nodes = [];

            if((!kizz.nodeType || kizz.nodeType === this.nodeType || kizz.nodeType === this.className) && kizz.matchAttrs(this)) {
                nodes.push(this);
            }

            return nodes;
        },

    });

})();
