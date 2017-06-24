import BodyCalulator = require('./helpers/bodyCalculator');

class SpawnManager {
    run = (room: Room): void => {
        var spawn = room.find<Spawn>(FIND_MY_SPAWNS)[0]
        var roomSources = room.find<Source>(FIND_SOURCES);
        var roomCreeps = room.find<Creep>(FIND_MY_CREEPS);

        if (!spawn.spawning)
            assignWorkers(roomSources, spawn, roomCreeps);
        console.log("------")
    }
}

function assignWorkers(roomSources: Source[], spawn: Spawn, roomCreeps: Creep[]) {
    for (let source of roomSources) {
        if (!_.any(roomCreeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "harvester")) {
            console.log("make harverster" + source.id);
            spawn.createCreep(BodyCalulator.getHarvesterBody(spawn.room), null, { role: "harvester", sourceid: source.id });
            return;
        }
        else if (_.filter(roomCreeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "mule").length < 2) {
            console.log("make mule" + source.id);
            spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id });
            return;
        }
    }

    if (!_.any(roomCreeps, creep => creep.memory.role == "upgrader")) {
        console.log("make upgrader");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "upgrader" });
    }
    else if (_.filter(roomCreeps, creep => creep.memory.role == "worker").length < 5) {
        console.log("worker");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker", job: "requesting_energy" });
    }
}

export = new SpawnManager();