"use strict";
var roadMaker = {
    run: function (creep, target) {
        if (creep.memory.pathMade != false)
            return;
        creep.say("Mk Rds");
        var paths = creep.room.findPath(creep.pos, target.pos);
        for (var i = 0; i < paths.length; i++) {
            creep.room.createConstructionSite(paths[i].x, paths[i].y, STRUCTURE_ROAD);
        }
        creep.memory.pathMade = true;
    }
};
module.exports = roadMaker;
