define([
    'kinetic',
    'lodash'
], function (Kinetic, _) {

    function wrapButton(elem,w,h,attrs) {
        // Extend our group with the button class. This prevent collisions with the select tool.
        grp = new Kinetic.Group(_.mixin(attrs, {
            classes: ['button']
        }));
        hitDetector = new Kinetic.Rect({
            width: w,
            height: h,
            offset: {
                x: w / 2,
                y: h / 2
            }
        });

        grp.add(hitDetector);
        grp.add(elem);

        // Possible enhancement: scale to fit here
        function passThroughEvent(name) {
            hitDetector.on(name, function (e) {
                elem.fire(name, e, false);
            });
        }

        // Event redirection
        passThroughEvent('click');
        passThroughEvent('dblclick');
        passThroughEvent('mousedown');
        passThroughEvent('mousemove');
        passThroughEvent('mouseup');

        return grp;
    }

    return {
        wrapButton: wrapButton
    }
});