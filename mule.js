"use strict";
function collectDroppedResource(creep, resource) {
    if (creep.pickup(resource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
function collectFromContainer(creep, container) {
    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
function deliverLoad(creep) {
    var target = getTarget(creep);
    if (target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    else {
        creep.memory.target = false;
    }
    if (creep.carry.energy == 0)
        creep.memory.job = "collecting";
}
function getTarget(creep) {
    if (creep.memory.target) {
        return Game.getObjectById(creep.memory.target);
    }
    else {
        var emptyExtensionOrSpawn = _.find(creep.room.find(FIND_STRUCTURES), function (struct) { return ((struct.structureType == STRUCTURE_EXTENSION
            || struct.structureType == STRUCTURE_SPAWN)
            && struct.energy < struct.energyCapacity); });
        var workersRequestingEnergy = _.filter(creep.room.find(FIND_MY_CREEPS), function (creep) {
            return creep.memory.job == "requesting_energy" && creep.carry.energy < creep.carryCapacity;
        });
        var mostEmptyWorkerRequestingEnergy = workersRequestingEnergy.sort(function (a, b) { return a.carry.energy - b.carry.energy; })[0];
        console.log(mostEmptyWorkerRequestingEnergy.name);
        var target = emptyExtensionOrSpawn || mostEmptyWorkerRequestingEnergy || creep.room.storage;
        if (target)
            creep.memory.target = target.id;
        return target;
    }
}
module.exports = {
    run: function (creep) {
        var source = Game.getObjectById(creep.memory.sourceid);
        var container = source.pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } })[0];
        var droppedResource = source.pos.findInRange(FIND_DROPPED_RESOURCES, 2)[0];
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.job = "delivering";
        }
        if (creep.memory.job == "delivering") {
            deliverLoad(creep);
        }
        else if (droppedResource) {
            collectDroppedResource(creep, droppedResource);
        }
        else if (container) {
            collectFromContainer(creep, container);
        }
    }
};
