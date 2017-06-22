export = {
    run: function (creep) {

        var source = Game.getObjectById<Source>(creep.memory.sourceid);
        var container = source.pos.findClosestByRange<Container>(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
        var droppedResource = source.pos.findClosestByRange<Resource>(FIND_DROPPED_ENERGY);

        console.log(droppedResource);

        if (creep.carry.energy == creep.carryCapacity) {
            console.log("drop load");
            deliverLoad(creep);
        }

        else if (droppedResource) {
            console.log("collect res");
            collectDroppedResource(creep, droppedResource);
        }

        else if (container) {
            console.log("collect cont");
            collectFromContainer(creep, container);
        }
    }
};

function collectDroppedResource(creep, resource) {

    if (creep.pickup(resource) == ERR_NOT_IN_RANGE) {
        console.log("not range");
        creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}

function collectFromContainer(creep, container) {
    if (creep.withdraw(container) == ERR_NOT_IN_RANGE) {
        console.log("not range");
        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}

function deliverLoad(creep) {
    console.log("at capacity");
    var target = _.find(creep.room.find(FIND_STRUCTURES),
        (struct: Extension | Spawn) => (struct.structureType == STRUCTURE_EXTENSION
            || struct.structureType == STRUCTURE_SPAWN)
            && struct.energy < struct.energyCapacity)

    if (target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}