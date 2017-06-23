"use strict";
var BodyCalulator = require("./bodyCalculator");
var SpawnManager = (function () {
    function SpawnManager() {
        this.run = function (room) {
            var spawn = room.find(FIND_MY_SPAWNS)[0];
            var roomSources = room.find(FIND_SOURCES);
            var roomCreeps = room.find(FIND_MY_CREEPS);
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
    else if (_.filter(roomCreeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "mule"; }).length < 2) {
        spawn.createCreep(BodyCalulator.getMuleBody(spawn.room), null, { role: "mule", sourceid: source.id });
    }
    else if (!_.any(roomCreeps, function (creep) { return creep.memory.role == "upgrader"; })) {
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "upgrader" });
    }
    else if (_.filter(roomCreeps, function (creep) { return creep.memory.role == "worker"; }).length < 5) {
        spawn.createCreep(BodyCalulator.getWorkerBody(spawn.room), null, { role: "worker" });
    }
}
module.exports = new SpawnManager();
