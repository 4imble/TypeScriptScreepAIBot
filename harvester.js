"use strict";
var PositionHelper = require("./positionHelper");
module.exports = {
    run: function (creep) {
        var source = Game.getObjectById(creep.memory.sourceid);
        var container = source.pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_CONTAINER } })[0];
        if ((container && !PositionHelper.areSameLocation(creep, container)) || creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container || source, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};
