export = {
    run: function (creep: Creep, flag: Flag) {
        creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });

        if (creep.room == flag.room) {
            var construction = creep.pos.findClosestByRange<ConstructionSite>(FIND_CONSTRUCTION_SITES);
            constructStructure(creep, construction);
        }
    }
};

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