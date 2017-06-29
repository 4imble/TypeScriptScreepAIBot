export = {
    run: function (creep: Creep) {
        var source = Game.getObjectById<Source>(creep.memory.sourceid) || creep.pos.findClosestByRange<Source>(FIND_SOURCES);
        var container = source.pos.findInRange<Container>(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_CONTAINER } })[0];
        var droppedResource = creep.pos.findInRange<Resource>(FIND_DROPPED_RESOURCES, 5,
            { filter: (resource: Resource) => resource.amount > 100 })[0]
            || source.pos.findInRange<Resource>(FIND_DROPPED_RESOURCES, 5)[0];

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

function getTarget(creep: Creep): Structure | Creep {
    if (creep.memory.target) {
        return Game.getObjectById<Structure | Creep>(creep.memory.target);
    }
    else {
        var room = creep.room.controller.my ? creep.room : Game.spawns["OriginSpawn"].room;

        var emptyExtensionOrSpawn = creep.pos.findClosestByRange<Structure>(FIND_STRUCTURES, {
            filter:
            (struct: Extension | Spawn) => ((struct.structureType == STRUCTURE_EXTENSION
                || struct.structureType == STRUCTURE_SPAWN)
                && struct.energy < struct.energyCapacity)
        });

        var remoteBuilderRequestingEnergy = _.find(creep.room.find<Creep>(FIND_MY_CREEPS), (creep: Creep) =>
            creep.memory.role == "builder" && creep.memory.job == "requesting_energy" && creep.carry.energy < creep.carryCapacity);

        var workersRequestingEnergy = _.filter(room.find<Creep>(FIND_MY_CREEPS), (creep: Creep) =>
            creep.memory.job == "requesting_energy" && creep.carry.energy < creep.carryCapacity);

        var mostEmptyWorkerRequestingEnergy = workersRequestingEnergy.sort((a, b) => a.carry.energy - b.carry.energy)[0]

        var target = remoteBuilderRequestingEnergy || emptyExtensionOrSpawn || mostEmptyWorkerRequestingEnergy || room.storage;

        if (target)
            creep.memory.target = target.id;

        if (_.find(creep.room.find(FIND_FLAGS), (flag: Flag) => flag.color == COLOR_GREEN)) {
            console.log(mostEmptyWorkerRequestingEnergy);
            return mostEmptyWorkerRequestingEnergy;
        }

        return target;
    }
}