"use strict";
function upgradeController(creep, controller) {
    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = "collecting";
}
function collectFromStorage(creep, storage) {
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
module.exports = {
    run: function (creep) {
        var controller = creep.room.controller;
        var storage = controller.pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.job = "upgrading";
        }
        if (creep.memory.job == "upgrading") {
            upgradeController(creep, controller);
        }
        else if (storage) {
            collectFromStorage(creep, storage);
        }
    }
};
