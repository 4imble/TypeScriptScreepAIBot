"use strict";
var PositionHelper = (function () {
    function PositionHelper() {
        this.inverseDirection = function (direction) {
            return direction <= 4 ? direction + 4 : direction - 4;
        };
        this.getPosInverseToOrigin = function (origin, source) {
            var xdiff = origin.x - source.x;
            var ydiff = origin.y - source.y;
            return new RoomPosition(origin.x + xdiff, origin.y + ydiff, origin.roomName);
        };
        this.areSameLocation = function (thing1, thing2) {
            if (!thing1 || !thing2)
                return false;
            return thing1.pos.toString() == thing2.pos.toString();
        };
    }
    return PositionHelper;
}());
module.exports = new PositionHelper();
