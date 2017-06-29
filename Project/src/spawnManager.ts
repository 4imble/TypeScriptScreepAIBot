import BodyCalulator = require('./helpers/bodyCalculator');

class SpawnManager {
    run = (room: Room): void => {
        var spawn = room.find<Spawn>(FIND_MY_SPAWNS)[0];
        if (!spawn.spawning)
            assignWorkers(room, spawn);
    }
}

function assignWorkers(room: Room, spawn: Spawn) {
        var roomSources = room.find<Source>(FIND_SOURCES);
        var roomCreeps = room.find<Creep>(FIND_MY_CREEPS);

    for (let source of roomSources) {
        if (!_.any(Game.creeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "harvester")) {
            console.log("make harverster" + source.id);
            spawn.createCreep(BodyCalulator.getHarvesterBody(spawn.room), null, { role: "harvester", sourceid: source.id, room: room.name });
            return;
        }
        else if (_.filter(Game.creeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "mule").length < 2) {
            console.log("make mule" + source.id);
            spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id, room: room.name });
            return;
        }
    }

    if (!_.any(roomCreeps, creep => creep.memory.room == room.name && creep.memory.role == "upgrader")) {
        console.log("make upgrader");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "upgrader", room: room.name });
    }
    else if (_.filter(roomCreeps, creep => creep.memory.room == room.name && creep.memory.role == "worker").length < 3) {
        console.log("worker");
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker", job: "requesting_energy", room: room.name });
    }
}

export = new SpawnManager();