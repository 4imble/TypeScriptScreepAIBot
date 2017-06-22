"use strict";
var BodyCalulator = require("./bodyCalculator");
var SpawnManager = (function () {
    function SpawnManager() {
        this.run = function (room) {
            var spawn = room.find(FIND_MY_SPAWNS)[0];
            var roomSources = room.find(FIND_SOURCES);
            var roomCreeps = room.find(FIND_CREEPS);
            if (!spawn.spawning)
                _.forEach(roomSources, function (x) { return assignWorkers(x, spawn, roomCreeps); });
        };
    }
    return SpawnManager;
}());
function assignWorkers(source, spawn, roomCreeps) {
    if (!_.any(roomCreeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "harvester"; })) {
        spawn.createCreep(BodyCalulator.getHarvesterBody(spawn.room), null, { role: "harvester", sourceid: source.id });
    }
    else if (!_.any(roomCreeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "mule"; })) {
        spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id });
    }
    else if (_.filter(roomCreeps, function (creep) { return creep.memory.role == "worker"; }).length < 3) {
        var storage = spawn.pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        if (storage)
            spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker" });
    }
}
module.exports = new SpawnManager();
