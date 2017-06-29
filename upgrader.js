"use strict";
function upgradeController(creep, controller, storage) {
    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = storage ? "collecting" : "requesting_energy";
}
function collectFromStorage(creep, storage) {
    if (creep.memory.job == "requesting_energy")
        return;
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
module.exports = {
    run: function (creep) {
        var controller = Game.rooms[creep.memory.room].controller;
        var storage = controller.pos.findInRange(FIND_STRUCTURES, 5, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
        if (creep.room == controller.room) {
            upgradeController(creep, controller, storage);
            if (storage) {
                collectFromStorage(creep, storage);
            }
        }
    }
};
