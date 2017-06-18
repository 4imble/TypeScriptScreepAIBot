"use strict";
var roadMaker = require("./roadMaker");
var roleTowerLord = {
    run: function (creep) {
        if (creep.carry.energy == 0) {
            creep.say("gathering");
            creep.memory.role = "gatherer";
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    return structure.structureType == STRUCTURE_TOWER;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    roadMaker.run(creep, targets[0]);
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
module.exports = roleTowerLord;
