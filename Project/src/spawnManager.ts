import BodyCalulator = require('./helpers/bodyCalculator');

class SpawnManager {
    contstructor() { }

    run = (): void => {
        var spawn = Game.spawns["Spawn1"];
        var roomSources = spawn.room.find<Source>(FIND_SOURCES);
        var roomCreeps = spawn.room.find<Creep>(FIND_CREEPS);

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
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker" });
    }
}

export = new SpawnManager();