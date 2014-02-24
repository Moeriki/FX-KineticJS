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

    });

    Kinetic.Util.addMethods(Kinetic.Node, {

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
