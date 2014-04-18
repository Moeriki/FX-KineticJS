multiselector
    =   whitespace coll:selectorcollection whitespace { return coll; }

selectorcollection
    =   sel:singleselectorbase whitespace ',' whitespace coll:selectorcollection {
            return {
                find: function() {
                    return sel.find().concat(coll.find());
                }
            };
        }
    /   sel:singleselectorbase {
            return {
                find: function() {
                    return sel.find();
                }
            };
        }

singleselectorbase
    =   sel:singleselector {
            return {
                find: function() {
                    return sel.find(function(x) { return x; });
                }
            };
        }

singleselector
    =   matchexpr:matchexpr relation:relation selector:singleselector {
            return {
                find: function(filterInvalids) {
                    var matches = filterInvalids(matchexpr.find());
                    return selector.find(function (selectorRoots) {
                        return selectorRoots.filter(function (selectorRoot) {
                            return matches.some(function(match) { return relation(match, selectorRoot); });
                        });
                    });
                }
            };
        }
    /   matchexpr:matchexpr {
            return {
                find: function(filterInvalids) {
                    return filterInvalids(matchexpr.find());
                }
            };
        }

relation
    =   whitespace '>' whitespace {
            // Returns a function that checks the parent relation.
            return function(a, b) {
                return b.parent == a;
            };
        }
    /   whitespace '+' whitespace {
            // Returns a function that checks the sibling relation.
            return function(a, b) {
                return a.parent != null && b.parent != null && a !== b && a.parent === b.parent;
            };
        }
    /   ' '+ {
            // Returns a function that checks the ancestor relation.
            return function(a, b) {
                return a.isAncestorOf(b);
            };
        }

matchexpr
    =   matchexpr:[^, ]+ {
            return {
                find: function() {
                    var kizz = Kinetic.Kizzle(matchexpr.join("")),
                        nodes = [],
                        baseNode = options.baseNode,
                        node, clen, c;
                    if(kizz.id) {
                        node = baseNode._getNodeById(kizz.id);
                        if(node) {
                            Array.prototype.push.apply(nodes, node._get(kizz));
                        }
                    } else if(kizz.name) {
                        Array.prototype.push.apply(nodes, baseNode._getNodesByName(kizz.name).filter(kizz.matchAttrs.bind(kizz)));
                    } else {
                        clen = baseNode.children.length;
                        for(c = 0; c < clen; c++) {
                            Array.prototype.push.apply(nodes, baseNode.children[c]._get(kizz));
                        }
                    }
                    return nodes;
                }
            };
        }

whitespace
    = ' '*
