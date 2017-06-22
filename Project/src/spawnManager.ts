export = {
    run: function () {
        var spawn = Game.spawns["Spawn1"];
        var roomSources = spawn.room.find<Source>(FIND_SOURCES);
        var roomCreeps = spawn.room.find<Creep>(FIND_CREEPS);

        if (!spawn.spawning)
            _.forEach(roomSources, (x) => assignWorkers(x, spawn, roomCreeps));
    }
}

function assignWorkers(source: Source, spawn: Spawn, roomCreeps: Creep[]) {
    if (!_.any(roomCreeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "harvester")) {
        spawn.createCreep([MOVE, WORK, WORK, CARRY], null, { role: "harvester", sourceid: source.id });
    }
    else if (!_.any(roomCreeps, creep => creep.memory.sourceid == source.id && creep.memory.role == "mule")) {
        spawn.createCreep([MOVE, MOVE, CARRY, CARRY], null, { role: "mule", sourceid: source.id });
    }
}