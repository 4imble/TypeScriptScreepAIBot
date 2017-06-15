"use strict";
var roleTowerLord = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
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
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
export = roleTowerLord;
