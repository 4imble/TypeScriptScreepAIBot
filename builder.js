"use strict";
function repairStructures(creep) {
    var repairs = _.filter(creep.room.find(FIND_STRUCTURES), function (struct) { return struct.hits < struct.hitsMax - 300; });
    repairs.sort(function (a, b) { return a.hits - b.hits; });
    if (repairs.length) {
        if (creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(repairs[0], { visualizePathStyle: { stroke: '#9af441' } });
        }
        if (creep.carry.energy == 0) {
            var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            collectDroppedResource(creep, droppedResource);
        }
    }
}
function constructStructure(creep, construction) {
    if (creep.build(construction) == ERR_NOT_IN_RANGE || creep.carry.energy == 0) {
        creep.moveTo(construction, { visualizePathStyle: { stroke: '#9af441' } });
    }
    if (creep.carry.energy == 0) {
        var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        collectDroppedResource(creep, droppedResource);
        creep.memory.job = "requesting_energy";
    }
    else {
        creep.memory.job = "contructing";
    }
}
function collectDroppedResource(creep, resource) {
    if (creep.pickup(resource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
module.exports = {
    run: function (creep, flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
        if (creep.room == flag.room) {
            var construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (construction)
                constructStructure(creep, construction);
            else
                repairStructures(creep);
        }
    }
};
