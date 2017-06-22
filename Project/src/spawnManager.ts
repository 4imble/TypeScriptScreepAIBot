import BodyCalulator = require('./helpers/bodyCalculator');

class SpawnManager {
    run = (room: Room): void => {
        var spawn = room.find<Spawn>(FIND_MY_SPAWNS)[0]
        var roomSources = room.find<Source>(FIND_SOURCES);
        var roomCreeps = room.find<Creep>(FIND_CREEPS);

        if (!spawn.spawning)
            _.forEach(roomSources, (x) => assignWorkers(x, spawn, roomCreeps));
    }
}

function assignWorkers(source: Source, spawn: Spawn, roomCreeps: Creep[]) {
    if (!_.any(roomCreeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "harvester")) {
        spawn.createCreep(BodyCalulator.getHarvesterBody(spawn.room), null, { role: "harvester", sourceid: source.id });
    }
    else if (!_.any(roomCreeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "mule")) {
        spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id });
    }
    else if (_.filter(roomCreeps, creep => creep.memory.role == "worker").length < 3) {
        var storage = spawn.pos.findInRange<Container>(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_STORAGE } })[0];

        if (storage)
            spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker" });
    }
}

export = new SpawnManager();