"use strict";
var jobManager = require("./room.jobManager");
var roleGatherer = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source], { visualizePathStyle: { stroke: '#f4eb42' } });
            }
        }
        else {
            jobManager.assignJob(creep);
        }
    }
};
module.exports = roleGatherer;
