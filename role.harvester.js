"use strict";
var roadMaker = require("./roadMaker");
var roleHarvester = {
    run: function (creep) {
        if (creep.carry.energy == 0) {
            creep.say("gathering");
            creep.memory.role = "gatherer";
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN)
                        && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    roadMaker.run(creep, creep.room.controller);
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
module.exports = roleHarvester;
