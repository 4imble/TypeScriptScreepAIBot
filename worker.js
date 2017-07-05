"use strict";
function calulateJob(creep, emptyTower, construction, storage) {
    if (creep.carry.energy == creep.carryCapacity || (!storage && construction)) {
        if (emptyTower && _.filter(Game.creeps, function (creep) { return creep.memory.job == "tower_refilling" && creep.memory.role == "worker"; }).length < 2)
            creep.memory.job = "tower_refilling";
        else if (construction)
            creep.memory.job = "constructing";
        else
            creep.memory.job = "upgrading";
    }
}
function constructStructure(creep, construction) {
    if (creep.build(construction) == ERR_NOT_IN_RANGE) {
        creep.moveTo(construction, { visualizePathStyle: { stroke: '#9af441' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = "requesting_energy";
}
function upgradeController(creep, controller, storage) {
    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = storage ? "collecting" : "requesting_energy";
}
function refillTower(creep, emptyTower, storage) {
    if (creep.transfer(emptyTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(emptyTower, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = storage ? "collecting" : "requesting_energy";
}
function collectFromStorage(creep, storage) {
    if (tooFarFromStorage(creep, storage)) {
        return;
    }
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
function tooFarFromStorage(creep, storage) {
    return creep.pos.getRangeTo(storage) > 10;
}
module.exports = {
    run: function (creep) {
        var room = Game.rooms[creep.memory.room];
        var controller = room.controller;
        var storage = controller.pos.findInRange(FIND_STRUCTURES, 5, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        var emptyTowers = _.filter(room.find(FIND_STRUCTURES), function (struct) { return struct.structureType == STRUCTURE_TOWER && struct.energy < struct.energyCapacity; });
        var mostEmptyTower = _.sortBy(emptyTowers, function (tower) { return tower.energy; })[0];
        var construction = controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#9af441' } });
        calulateJob(creep, mostEmptyTower, construction, storage);
        if (creep.memory.job == "upgrading") {
            upgradeController(creep, controller, storage);
        }
        else if (creep.memory.job == "tower_refilling") {
            refillTower(creep, mostEmptyTower, storage);
        }
        else if (creep.memory.job == "constructing") {
            constructStructure(creep, construction);
        }
        else if (storage) {
            collectFromStorage(creep, storage);
        }
    }
};
