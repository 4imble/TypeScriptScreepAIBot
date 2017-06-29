export = {
    run: function (creep: Creep, flag: Flag) {
        var spawn = _.find(Game.spawns, (spawn) => spawn.room == flag.room);
        if (spawn)
            creep.memory.role = "upgrader";

        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });

        if (creep.room == flag.room) {
            var construction = creep.pos.findClosestByRange<ConstructionSite>(FIND_CONSTRUCTION_SITES);
            if (construction)
                constructStructure(creep, construction);
            else
                repairStructures(creep);

            creep.moveTo(creep);
        }
    }
};

function repairStructures(creep: Creep) {
    var repairs = _.filter(creep.room.find<Structure>(FIND_STRUCTURES),
        (struct: Structure) => struct.hits < struct.hitsMax - 300);

    repairs.sort((a, b) => a.hits - b.hits);
    if (repairs.length) {
        if (creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(repairs[0], { visualizePathStyle: { stroke: '#9af441' } });
        }

        if (creep.carry.energy == 0) {
            var droppedResource = creep.pos.findClosestByRange<Resource>(FIND_DROPPED_RESOURCES);
            collectDroppedResource(creep, droppedResource);
        }
    }
}

function constructStructure(creep: Creep, construction: ConstructionSite) {
    if (creep.build(construction) == ERR_NOT_IN_RANGE || creep.carry.energy == 0) {
        creep.moveTo(construction, { visualizePathStyle: { stroke: '#9af441' } });
    }

    if (creep.carry.energy == 0) {
        var droppedResource = creep.pos.findClosestByRange<Resource>(FIND_DROPPED_RESOURCES);
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