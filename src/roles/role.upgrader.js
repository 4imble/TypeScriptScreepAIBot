"use strict";
var roadMaker = require("./roadMaker");
var roleUpgrader = {
    run: function (creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }
        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                roadMaker.run(creep, creep.room.controller);
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#41d9f4' } });
            }
        }
        else {
            creep.memory.role = "gatherer";
        }
    }
};
module.exports = roleUpgrader;
