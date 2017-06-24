export = {
    run: function (creep: Creep) {
        var source = Game.getObjectById<Source>(creep.memory.sourceid);
        var container = source.pos.findInRange<Container>(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } })[0];
        var droppedResource = source.pos.findInRange<Resource>(FIND_DROPPED_RESOURCES, 2)[0];

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

function deliverLoad(creep: Creep) {
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

function getTarget(creep: Creep): Structure|Creep {
    if (creep.memory.target) {
        return Game.getObjectById<Structure|Creep>(creep.memory.target);
    }
    else {
        var emptyExtensionOrSpawn = _.find(creep.room.find<Structure>(FIND_STRUCTURES),
            (struct: Extension | Spawn) => ((struct.structureType == STRUCTURE_EXTENSION
                || struct.structureType == STRUCTURE_SPAWN)
                && struct.energy < struct.energyCapacity));

        var workersRequestingEnergy = _.find(creep.room.find<Creep>(FIND_MY_CREEPS), (creep: Creep) =>
            creep.memory.job == "requesting_energy" && creep.carry.energy == 0);
        
        var target = emptyExtensionOrSpawn || workersRequestingEnergy || creep.room.storage;

        creep.memory.target = target.id;
        return target;
    }
}